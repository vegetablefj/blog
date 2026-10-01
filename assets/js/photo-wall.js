(function () {
  var element = document.getElementById('photo-wall-grid');
  if (!element || typeof window.Muuri !== 'function') return;

  var grid;
  try {
    element.classList.add('is-muuri');
    grid = new window.Muuri(element, {
      items: '.photo-wall-item',
      dragEnabled: false,
      layout: { fillGaps: false },
      layoutOnResize: false,
      layoutDuration: 0
    });
  } catch (error) {
    element.classList.remove('is-muuri');
    return;
  }

  var resizeTimer;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      grid.refreshItems().layout();
    }, 150);
  });
})();
