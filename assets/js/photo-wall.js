(function () {
  var element = document.getElementById('photo-wall-grid');
  if (!element) return;

  var items = element.querySelectorAll('.photo-wall-item');
  var startOffsets = [0, 82, 28, 126];
  for (var index = 1; index < Math.min(startOffsets.length, items.length); index++) {
    var jitter = Math.round((Math.random() - 0.5) * 28);
    items[index].style.setProperty('--photo-wall-start-offset', startOffsets[index] + jitter + 'px');
  }

  var wall = null;
  if (typeof window.Masonry === 'function') {
    try {
      element.classList.add('is-masonry');
      wall = new window.Masonry(element, {
        itemSelector: '.photo-wall-item',
        columnWidth: '.photo-wall-sizer',
        gutter: 10,
        horizontalOrder: true,
        percentPosition: true,
        transitionDuration: 0
      });
    } catch (error) {
      element.classList.remove('is-masonry');
    }
  }

  var layoutQueued = false;
  function queueLayout() {
    if (!wall || layoutQueued) return;
    layoutQueued = true;
    requestAnimationFrame(function () {
      layoutQueued = false;
      if (element.isConnected) wall.layout();
    });
  }

  function watchImages(container) {
    container.querySelectorAll('img').forEach(function (image) {
      if (!image.complete) {
        image.addEventListener('load', queueLayout, { once: true });
      }
    });
  }
  watchImages(element);

  var sentinel = document.getElementById('photo-wall-sentinel');
  if (!sentinel) return;
  var button = document.getElementById('photo-wall-load-more');
  var batchURLs = sentinel.dataset.batches.split('|').filter(Boolean);
  var nextBatch = 0;
  var loading = false;
  var observer = null;

  async function loadNext() {
    if (loading || nextBatch >= batchURLs.length || !element.isConnected) return;
    loading = true;
    button.hidden = true;
    if (observer) observer.unobserve(sentinel);

    try {
      var response = await fetch(batchURLs[nextBatch], { credentials: 'same-origin' });
      if (!response.ok) throw new Error('Photo wall batch request failed');
      var template = document.createElement('template');
      template.innerHTML = await response.text();
      var added = Array.from(template.content.querySelectorAll('.photo-wall-item'));
      if (!added.length) throw new Error('Photo wall batch was empty');
      if (!element.isConnected) return;
      added.forEach(function (item) { item.classList.add('is-entering'); });
      watchImages(template.content);
      element.appendChild(template.content);
      if (wall) wall.appended(added);
      queueLayout();
      nextBatch++;
    } catch (error) {
      button.hidden = false;
      return;
    } finally {
      loading = false;
    }

    if (nextBatch < batchURLs.length) {
      if (observer) observer.observe(sentinel);
      else button.hidden = false;
    } else {
      sentinel.remove();
      button.remove();
    }
  }

  button.addEventListener('click', loadNext);
  if ('IntersectionObserver' in window) {
    observer = new IntersectionObserver(function (entries) {
      if (entries.some(function (entry) { return entry.isIntersecting; })) loadNext();
    }, { rootMargin: '600px 0px' });
    observer.observe(sentinel);
  } else {
    button.hidden = false;
  }
})();
