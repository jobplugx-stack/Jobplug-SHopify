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

// Whole-page application: a sample application fills in as the visitor scrolls the homepage.
(() => {
  const main = document.querySelector('#main, main');
  const hero = document.querySelector('.hero');
  if (!main || !hero || document.querySelector('[data-application-journey]')) return;
  const sections = [...main.querySelectorAll(':scope > section')];
  if (sections.length < 6) return;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const clamp = (v,a=0,b=1) => Math.max(a,Math.min(b,v));
  const el = (tag,cls,html) => { const e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; };
  const NAME = 'Alex Morgan';
  const CHECK = '<svg viewBox="0 0 16 16" width="12" height="12" aria-hidden="true"><path d="M3 8.5l3.2 3L13 4.5" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  const progressBar = el('div','jp-scrollbar'); progressBar.setAttribute('aria-hidden','true');
  const root = el('aside','jp-app'); root.setAttribute('aria-label','Sample job application that fills in as you scroll');
  root.innerHTML = '<div class="jp-app-head"><span class="jp-app-logo" aria-hidden="true">⚡</span><div class="jp-app-title"><strong>Job application</strong><span data-app-name>Alex Morgan</span></div><span class="jp-app-status" data-app-status>Draft</span><button type="button" class="jp-app-close" aria-label="Hide sample application">×</button></div><div class="jp-app-meter" aria-hidden="true"><i data-app-meter></i></div><div class="jp-app-window" aria-hidden="true"><div class="jp-app-track" data-app-track></div></div>';
  const track = root.querySelector('[data-app-track]');
  const status = root.querySelector('[data-app-status]');
  const meter = root.querySelector('[data-app-meter]');

  const rows = [];
  const add = (label,build) => {
    const wrap = el('div','jp-row'); wrap.append(el('span','jp-label',label));
    const body = el('div','jp-body'); wrap.append(body); track.append(wrap);
    rows.push({ wrap, update: build(body) });
  };
  add('Full name', body => {
    const t = el('span','jp-type'); const caret = el('i','jp-caret'); body.classList.add('jp-field'); body.append(t,caret);
    return p => { t.textContent = NAME.slice(0,Math.round(NAME.length*clamp(p/0.75))); caret.hidden = p <= 0 || p >= 1; };
  });
  add('Résumé', body => {
    body.innerHTML = '<div class="jp-file"><span class="jp-pdf">PDF</span><span>Alex_Morgan_Resume.pdf</span><b class="jp-badge" data-b>ATS-ready</b></div><div class="jp-lines"><i></i><i></i><i></i></div>';
    const bars = [...body.querySelectorAll('.jp-lines i')], badge = body.querySelector('[data-b]');
    return p => { bars.forEach((b,i) => b.style.transform = `scaleX(${clamp((p-i*0.18)/0.5)})`); badge.classList.toggle('on',p > 0.85); };
  });
  add('Interview prep', body => {
    const items = ['Mock interview','Technical study','Role roadmap'].map(t => { const li = el('div','jp-check',`<span class="jp-box">${CHECK}</span>${t}`); body.append(li); return li; });
    return p => items.forEach((li,i) => li.classList.toggle('on',p > 0.2+i*0.28));
  });
  add('Your plan', body => {
    const items = ['Résumé support','Interview prep','Full package'].map(t => { const d = el('div','jp-radio',`<span class="jp-dot"></span>${t}`); body.append(d); return d; });
    return p => items.forEach((d,i) => d.classList.toggle('on',i === (p > 0.55 ? 2 : p > 0.25 ? 1 : p > 0.02 ? 0 : -1)));
  });
  add('Strong references', body => {
    body.innerHTML = '<div class="jp-stars">' + '<span>★</span>'.repeat(5) + '</div>';
    const stars = [...body.querySelectorAll('.jp-stars span')];
    return p => stars.forEach((s,i) => s.classList.toggle('on',p > 0.1+i*0.16));
  });
  add('Cover letter', body => {
    body.innerHTML = '<div class="jp-lines jp-letter"><i></i><i></i><i></i><i></i></div>';
    const bars = [...body.querySelectorAll('i')];
    return p => bars.forEach((b,i) => b.style.transform = `scaleX(${clamp((p-i*0.2)/0.4)})`);
  });
  let submitBtn;
  add('Ready?', body => {
    submitBtn = el('div','jp-submit','Submit application'); body.append(submitBtn);
    return p => { submitBtn.classList.toggle('pressed',p > 0.35); submitBtn.textContent = p > 0.8 ? 'Offer received ✓' : p > 0.35 ? 'Submitted ✓' : 'Submit application'; submitBtn.classList.toggle('won',p > 0.8); };
  });

  // Map each row to a homepage section: the journey section is dropped, so one row per remaining homepage section.
  const map = rows.map((_,i) => sections[Math.min(i,sections.length-1)]);
  let offsets = [], winH = 0, frame = 0, hidden = false;
  const measure = () => {
    offsets = rows.map(r => r.wrap.offsetTop);
    winH = root.querySelector('.jp-app-window').clientHeight;
  };
  const update = () => {
    frame = 0;
    const vh = innerHeight, line = vh * 0.62;
    let f = 0, overall = 0;
    rows.forEach((r,i) => {
      const rect = map[i].getBoundingClientRect();
      const p = reduced ? 1 : clamp((line - rect.top) / Math.max(1,Math.min(rect.height,vh*0.9)));
      r.update(p); r.wrap.classList.toggle('active',p > 0 && p < 1); r.wrap.classList.toggle('done',p >= 1);
      if (p >= 1) f = i + 1; else if (p > 0 && f === i) f = i + p;
      overall += p;
    });
    const i = Math.min(Math.floor(f),rows.length-1), next = Math.min(i+1,rows.length-1);
    const pos = offsets[i] + (offsets[next]-offsets[i]) * (f - i);
    track.style.transform = `translateY(${-Math.max(0,pos - winH*(innerWidth<=800?0.03:0.18)).toFixed(1)}px)`;
    const frac = overall / rows.length;
    meter.style.transform = `scaleX(${frac.toFixed(3)})`;
    status.textContent = frac > 0.97 ? 'Offer received' : frac > 0.86 ? 'Submitted' : 'Draft';
    status.dataset.state = status.textContent === 'Draft' ? 'draft' : 'done';
    const max = document.documentElement.scrollHeight - vh;
    progressBar.style.transform = `scaleX(${clamp(scrollY / Math.max(1,max)).toFixed(4)})`;
    root.classList.toggle('is-visible',!hidden && scrollY > vh*0.35);
  };
  const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
  root.querySelector('.jp-app-close').addEventListener('click',() => { hidden = true; root.classList.remove('is-visible'); document.body.classList.remove('has-jp-app'); });
  document.body.append(progressBar,root);
  document.body.classList.add('has-jp-app');
  addEventListener('scroll',schedule,{ passive:true });
  addEventListener('resize',() => { measure(); schedule(); });
  document.fonts?.ready.then(() => { measure(); schedule(); });
  measure(); update();
})();
