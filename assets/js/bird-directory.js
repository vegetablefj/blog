(() => {
  const entry = document.querySelector('.bird-directory .article-entry');
  if (!entry || entry.dataset.directoryEnhanced) return;
  entry.dataset.directoryEnhanced = 'true';

  const controller = new AbortController();
  const options = { signal: controller.signal };
  const groups = [];
  const groupHeadings = [];
  let section = '';
  for (const heading of entry.querySelectorAll('h2, h3')) {
    if (heading.matches('h2')) {
      section = heading.id;
      continue;
    }
    const isOverview = section === '鸟类概论';
    if (isOverview || /formes†?$/.test(heading.querySelector('.taxonomy-latin')?.textContent || '')) {
      groupHeadings.push({ heading, isOverview });
    }
  }

  for (const { heading, isOverview } of groupHeadings) {
    const details = document.createElement('details');
    details.className = `directory-order${isOverview ? ' directory-overview' : ''}`;
    details.open = isOverview;
    const summary = document.createElement('summary');
    const content = document.createElement('div');
    content.className = 'directory-order-content';
    heading.before(details);
    details.append(summary, content);
    let sibling = heading.nextElementSibling;
    summary.append(heading);
    while (sibling && !sibling.matches('h2, h3, .footnotes, [role="doc-endnotes"]')) {
      const next = sibling.nextElementSibling;
      content.append(sibling);
      sibling = next;
    }
    groups.push({ details, heading, isOverview });
  }
  if (!groups.length) return;
  const orderGroups = groups.filter(({ isOverview }) => !isOverview);

  const controls = document.createElement('div');
  controls.className = 'directory-controls';
  controls.setAttribute('role', 'group');
  controls.setAttribute('aria-label', '目录展开控制');
  for (const [label, open] of [['全部展开', true], ['全部收起', false]]) {
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = label;
    button.addEventListener('click', () => {
      orderGroups.forEach(({ details }) => { details.open = open; });
      scheduleUpdate();
    }, options);
    controls.append(button);
  }
  orderGroups[0]?.details.before(controls);

  const headings = [...entry.querySelectorAll('h2, h3, h4')];
  let scheduled = false;

  function targetForHash(hash) {
    try {
      const target = document.getElementById(decodeURIComponent(hash.slice(1)));
      return target && entry.contains(target) ? target : null;
    } catch {
      return null;
    }
  }

  function openParents(target) {
    let parent = target.closest('details');
    while (parent) {
      parent.open = true;
      parent = parent.parentElement.closest('details');
    }
  }

  function updateNavigation() {
    scheduled = false;
    if (!entry.isConnected) return;
    const visible = headings.filter((heading) => {
      const group = heading.closest('.directory-order');
      return (!group || group.open || heading.parentElement.matches('summary')) && heading.getClientRects().length;
    });
    let current = visible[0];
    for (const heading of visible) {
      if (heading.getBoundingClientRect().top > 120) break;
      current = heading;
    }
    for (const wrapper of document.querySelectorAll('.bird-directory-toc-wrapper')) {
      const links = [...wrapper.querySelectorAll('a[href^="#"]')];
      const items = [...wrapper.querySelectorAll('li')];
      items.forEach((item) => item.classList.remove('active', 'current'));
      for (const link of links) {
        const target = targetForHash(link.getAttribute('href'));
        const group = groups.find(({ heading }) => heading === target);
        link.parentElement.classList.toggle('directory-branch-closed', Boolean(group && !group.details.open));
        if (target !== current) continue;
        link.parentElement.classList.add('current');
        let parent = link.parentElement;
        while (parent && wrapper.contains(parent)) {
          if (parent.matches('li')) parent.classList.add('active');
          parent = parent.parentElement;
        }
      }
    }
  }

  function scheduleUpdate() {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(updateNavigation);
  }

  function revealHash() {
    const target = targetForHash(location.hash);
    if (!target) return;
    openParents(target);
    requestAnimationFrame(() => {
      target.scrollIntoView({ block: 'start', behavior: 'instant' });
      scheduleUpdate();
    });
  }

  document.addEventListener('click', (event) => {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const link = event.target.closest('.bird-directory-toc a[href^="#"], .bird-directory .header-anchor');
    if (!link) return;
    const hash = link.getAttribute('href');
    const target = targetForHash(hash);
    if (!target) return;
    event.preventDefault();
    openParents(target);
    history.replaceState(null, '', hash);
    requestAnimationFrame(() => {
      target.scrollIntoView({ block: 'start', behavior: 'instant' });
      scheduleUpdate();
    });
  }, { capture: true, signal: controller.signal });

  groups.forEach(({ details }) => details.addEventListener('toggle', scheduleUpdate, options));
  window.addEventListener('scroll', scheduleUpdate, { passive: true, signal: controller.signal });
  window.addEventListener('resize', scheduleUpdate, options);
  window.addEventListener('hashchange', revealHash, options);
  window.addEventListener('pjax:send', () => controller.abort(), { once: true, signal: controller.signal });
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', scheduleUpdate, { once: true, signal: controller.signal });
  }
  revealHash();
  scheduleUpdate();
})();
