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

// Native page scrolling advances (and reverses) this illustrative application.
(() => {
  const controllers = new Map();
  function initJourney(root) {
    if (controllers.has(root)) return;
    const abort = new AbortController();
    const options = { signal: abort.signal };
    const stage = root.querySelector('.journey-stage');
    const sheet = root.querySelector('[data-application-document]');
    const viewport = root.querySelector('.application-viewport');
    const beats = [...root.querySelectorAll('[data-journey-beat]')];
    const dots = [...root.querySelectorAll('[data-journey-dot]')];
    const navigation = root.querySelector('.journey-navigation');
    const counter = root.querySelector('[data-journey-counter]');
    const count = root.querySelector('[data-application-count]');
    const track = root.querySelector('[data-application-progress]');
    const previous = root.querySelector('[data-journey-previous]');
    const next = root.querySelector('[data-journey-next]');
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    let current = -1, frame = 0, enhanced = false;
    const clamp = value => Math.max(0,Math.min(1,value));
    const offset = () => parseFloat(getComputedStyle(root).getPropertyValue('--journey-top')) || 0;
    function show(index) {
      if (index === current) return;
      current = index;
      beats.forEach((beat,i) => { beat.hidden = i !== index; });
      dots.forEach((dot,i) => dot.classList.toggle('is-active',i <= index));
      counter.textContent = `${String(index+1).padStart(2,'0')} / ${String(beats.length).padStart(2,'0')}`;
      count.textContent = String(index+1).padStart(2,'0');
      previous.disabled = index === 0;
      next.disabled = index === beats.length-1;
    }
    function update() {
      frame = 0;
      if (!enhanced) return;
      const rect = root.getBoundingClientRect();
      const range = Math.max(1,root.offsetHeight-stage.offsetHeight);
      const progress = clamp((offset()-rect.top)/range);
      const position = progress*(beats.length-1);
      const base = Math.floor(position);
      // Brief holds make the answers readable between document movements.
      const fraction = clamp((position-base-.15)/.7);
      const eased = fraction*fraction*(3-2*fraction);
      sheet.style.transform = `translate3d(0,${-(base+eased)*viewport.clientHeight}px,0)`;
      track.style.transform = `scaleX(${(1+position)/beats.length})`;
      show(Math.round(position));
    }
    function schedule() { if (!frame) frame=requestAnimationFrame(update); }
    function configure() {
      // On short viewports or with reduced motion, present a readable static walkthrough.
      enhanced = !reduced.matches && innerHeight >= (innerWidth <= 600 ? 780 : 650);
      root.classList.toggle('is-enhanced',enhanced);
      navigation.hidden = !enhanced;
      current = -1;
      if (!enhanced) {
        beats.forEach(beat => { beat.hidden=false; });
        sheet.style.transform='';
        track.style.transform='scaleX(1)';
      } else update();
    }
    function go(delta) {
      if (!enhanced) return;
      const index = Math.max(0,Math.min(beats.length-1,current+delta));
      const start=root.getBoundingClientRect().top+scrollY-offset();
      const range=root.offsetHeight-stage.offsetHeight;
      window.scrollTo({top:start+range*index/(beats.length-1),behavior:'instant'});
      update();
    }
    previous.addEventListener('click',()=>go(-1),options);
    next.addEventListener('click',()=>go(1),options);
    window.addEventListener('scroll',schedule,{...options,passive:true});
    window.addEventListener('resize',configure,options);
    reduced.addEventListener('change',configure,options);
    configure();
    controllers.set(root,()=>{abort.abort();cancelAnimationFrame(frame);controllers.delete(root);});
  }
  document.querySelectorAll('[data-application-journey]').forEach(initJourney);
  document.addEventListener('shopify:section:load',event=>event.target.querySelectorAll('[data-application-journey]').forEach(initJourney));
  document.addEventListener('shopify:section:unload',event=>event.target.querySelectorAll('[data-application-journey]').forEach(root=>controllers.get(root)?.()));
})();
