import { findSearchMatches, prepareSearchEntries } from './local_search_core.js';

(() => {
  const config = window.LOCAL_SEARCH_CONFIG;
  if (!config) return;

  const trigger = document.getElementById('nav-search-btn');
  const popup = document.querySelector('.site-search .popup');
  const closeButton = popup?.querySelector('.popup-btn-close');
  const input = document.querySelector('#reimu-search-input input');
  const hits = document.getElementById('reimu-hits');
  const stats = document.getElementById('reimu-stats');
  const pagination = document.getElementById('reimu-pagination');
  const mask = document.getElementById('mask');
  const container = document.getElementById('container');
  const header = document.getElementById('header-nav');
  if (!trigger || !popup || !closeButton || !input || !hits || !stats ||
      !pagination || !mask || !container || !header) return;

  const perPage = Math.max(1, Number(config.perPage) || 10);
  const labels = config.labels || {};
  let documents;
  let pendingIndex;
  let results = [];
  let currentPage = 0;
  let debounceTimer;
  let requestNumber = 0;

  function loadIndex() {
    if (documents) return Promise.resolve(documents);
    if (!pendingIndex) {
      pendingIndex = fetch(config.indexURL, { cache: 'force-cache' })
        .then((response) => {
          if (!response.ok) throw new Error(`Search index: HTTP ${response.status}`);
          return response.json();
        })
        .then((entries) => {
          if (!Array.isArray(entries)) throw new Error('Invalid search index');
          documents = prepareSearchEntries(entries);
          return documents;
        })
        .catch((error) => {
          pendingIndex = undefined;
          throw error;
        });
    }
    return pendingIndex;
  }

  function renderPage() {
    hits.replaceChildren();
    pagination.replaceChildren();
    if (!results.length) return;

    const start = currentPage * perPage;
    for (const entry of results.slice(start, start + perPage)) {
      const item = document.createElement('div');
      item.className = 'reimu-hit-item';
      const link = document.createElement('a');
      link.className = 'reimu-hit-item-link';
      link.href = entry.url;
      link.textContent = entry.title;
      item.append(link);
      hits.append(item);
    }

    const pageCount = Math.ceil(results.length / perPage);
    if (pageCount <= 1) return;
    const firstPage = Math.max(0, Math.min(currentPage - 2, pageCount - 5));
    const lastPage = Math.min(pageCount, firstPage + 5);
    for (let page = firstPage; page < lastPage; page++) {
      const item = document.createElement('span');
      item.className = `pagination-item${page === currentPage ? ' current' : ''}`;
      const link = document.createElement('a');
      link.className = 'page-number';
      link.href = '#';
      link.textContent = String(page + 1);
      link.setAttribute('aria-label', `第 ${page + 1} 页`);
      if (page === currentPage) link.setAttribute('aria-current', 'page');
      link.addEventListener('click', (event) => {
        event.preventDefault();
        currentPage = page;
        renderPage();
      });
      item.append(link);
      pagination.append(item);
    }
  }

  function search(query) {
    const started = performance.now();
    results = findSearchMatches(documents, query);
    currentPage = 0;
    const elapsed = (performance.now() - started).toFixed(1);
    stats.textContent = results.length
      ? (labels.hits_stats || '找到 ${hits} 篇文章（用时 ${time} ms）')
          .replace('${hits}', String(results.length)).replace('${time}', elapsed)
      : (labels.hits_empty || '没有找到与「${query}」相关的文章')
          .replace('${query}', query);
    renderPage();
  }

  function searchFromInput() {
    const query = input.value.trim();
    const request = ++requestNumber;
    if (!query) {
      results = [];
      stats.textContent = '';
      hits.replaceChildren();
      pagination.replaceChildren();
      return;
    }
    if (!documents) stats.textContent = labels.loading || '正在加载文章索引……';
    loadIndex()
      .then(() => {
        if (request === requestNumber) search(query);
      })
      .catch((error) => {
        console.error(error);
        if (request === requestNumber) stats.textContent = labels.load_error || '搜索索引加载失败，请稍后重试。';
      });
  }

  function openSearch(event) {
    event.preventDefault();
    event.stopPropagation();
    const scrollWidth = window.innerWidth - document.documentElement.clientWidth;
    container.style.marginRight = `${scrollWidth}px`;
    header.style.marginRight = `${scrollWidth}px`;
    popup.classList.add('show');
    mask.classList.remove('hide');
    document.body.style.overflow = 'hidden';
    input.focus();
  }

  function closeSearch() {
    popup.classList.remove('show');
    mask.classList.add('hide');
    container.style.marginRight = '';
    header.style.marginRight = '';
    document.body.style.overflow = '';
    trigger.focus();
  }

  trigger.addEventListener('click', openSearch);
  closeButton.addEventListener('click', closeSearch);
  mask.addEventListener('click', () => {
    if (popup.classList.contains('show')) closeSearch();
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && popup.classList.contains('show')) closeSearch();
  });
  input.addEventListener('input', () => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(searchFromInput, 120);
  });
})();
