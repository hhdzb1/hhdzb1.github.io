// Keep greedy navigation on mobile; show every link on desktop.
(() => {
  const nav = document.querySelector('#site-nav');
  const button = nav.querySelector('button');
  const overflow = nav.querySelector('.hidden-links');
  const sync = () => button.setAttribute('aria-expanded', String(!overflow.classList.contains('hidden')));
  const close = () => {
    overflow.classList.add('hidden');
    button.classList.remove('close');
    sync();
  };
  const visible = nav.querySelector('.visible-links');
  const desktop = window.matchMedia('(min-width: 768px)');
  const updateGreedyNavigation = window.updateNav;
  // The template's resize listener calls this global function. Preserve its
  // mobile behavior without changing the upstream bundle or losing hidden links.
  window.updateNav = () => {
    if (desktop.matches) {
      visible.append(...overflow.children);
      window.breaks.length = 0;
      button.classList.add('hidden');
      button.setAttribute('count', '0');
      close();
    } else {
      updateGreedyNavigation();
      sync();
    }
  };
  window.updateNav();
  new MutationObserver(sync).observe(overflow, { attributes: true, attributeFilter: ['class'] });
  overflow.addEventListener('click', (event) => { if (event.target.closest('a')) close(); });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !overflow.classList.contains('hidden')) {
      close();
      button.focus();
    }
  });
  sync();
  // The upstream -20 px offset hides headings behind the sticky masthead.
  window.jQuery(() => {
    window.jQuery('#site-nav a').smoothScroll({
      beforeScroll: (options) => { options.offset = -document.querySelector('.masthead').offsetHeight - 12; }
    });
  });
})();
