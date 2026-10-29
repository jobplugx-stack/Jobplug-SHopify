(function(){
var sheet=document.getElementById('lv-sheet');if(!sheet)return;
var rows=[].slice.call(sheet.querySelectorAll('[data-row]')),dots=[].slice.call(sheet.querySelectorAll('.lv-dots i')),
steps=[].slice.call(document.querySelectorAll('.lv-step')),cards=[].slice.call(document.querySelectorAll('.lv-reveal')),
fill=document.getElementById('lv-fill'),count=document.getElementById('lv-count'),bar=document.getElementById('lv-bar'),now=document.getElementById('lv-now'),
names=['Name','Target role','Skills and experience','Inbox','Interview prep'];
function set(n){rows.forEach(function(r,i){r.classList.toggle('on',i<n)});dots.forEach(function(d,i){d.classList.toggle('on',i<n)});
fill.style.setProperty('--p',n);count.textContent=n+' of 5 plugged';bar.setAttribute('aria-valuenow',n);
now.textContent=n<5?(n?'Plugged: '+names[n-1]:'Scroll to plug in'):'Complete. Ready to submit.';sheet.classList.toggle('complete',n===5)}
function all(){set(5);steps.concat(cards).forEach(function(s){s.classList.add('in')})}
if((window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches)||!('IntersectionObserver' in window)){all();return}
var max=0;set(0);
var a=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');var n=+e.target.getAttribute('data-step');if(n>max){max=n;set(n)}}})},{rootMargin:'-40% 0px -40% 0px'});
steps.forEach(function(s){a.observe(s)});
var b=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');b.unobserve(e.target)}})},{threshold:.15});
cards.forEach(function(c){b.observe(c)});
var sub=document.getElementById('submit');if(sub)new IntersectionObserver(function(es){if(es[0].isIntersecting){max=5;set(5)}},{threshold:.05}).observe(sub);
})();
