(() => {
  const menu = document.querySelector('[data-menu-toggle]');
  const nav = document.querySelector('#main-nav');
  const closeMenu = () => { nav?.classList.remove('is-open'); menu?.setAttribute('aria-expanded','false'); };
  menu?.addEventListener('click', () => { const open = menu.getAttribute('aria-expanded') !== 'true'; menu.setAttribute('aria-expanded',String(open)); nav?.classList.toggle('is-open',open); });
  nav?.addEventListener('click', e => { if (e.target.closest('a')) closeMenu(); });
  document.addEventListener('keydown', e => { if(e.key === 'Escape' && menu?.getAttribute('aria-expanded') === 'true'){ closeMenu(); menu.focus(); } });
  document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => {
    const filter = button.dataset.filter;
    document.querySelectorAll('[data-filter]').forEach(b => b.setAttribute('aria-pressed',String(b === button)));
    let count=0;
    document.querySelectorAll('[data-category]').forEach(card => { card.hidden = filter !== 'all' && card.dataset.category !== filter; if(!card.hidden) count++; });
    const status=document.querySelector('[data-filter-status]'); if(status) status.textContent=`${count} services shown`;
  }));
  document.querySelectorAll('[data-variant-select]').forEach(select => select.addEventListener('change', () => {
    const option=select.selectedOptions[0]; const form=select.closest('form'); const button=form.querySelector('[type="submit"]');
    button.disabled=option.dataset.available==='false'; button.textContent=button.disabled?'Currently unavailable':'Add to cart →';
    const price=document.querySelector('[data-product-price]');if(price)price.textContent=option.dataset.price;
  }));
})();
