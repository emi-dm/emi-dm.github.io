// UI behaviors: theme toggle, scroll reveal
(function(){
  // Theme toggle with persistence
  const root = document.documentElement;
  const btn = document.getElementById('theme-toggle');
  function setTheme(mode){
    root.setAttribute('data-theme', mode);
    try{ localStorage.setItem('theme', mode); }catch(e){}
  }
  function toggle(){
    const cur = root.getAttribute('data-theme') || 'dark';
    setTheme(cur === 'dark' ? 'light' : 'dark');
  }
  if(btn){ btn.addEventListener('click', toggle); }

  // Scroll reveal using IntersectionObserver
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(prefersReduced) return;

  const single = document.querySelectorAll('.reveal');
  const grids = document.querySelectorAll('.reveal-grid');

  const obs = new IntersectionObserver((entries)=>{
    for(const e of entries){
      if(e.isIntersecting){
        e.target.classList.add('visible');
        obs.unobserve(e.target);
      }
    }
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  single.forEach(el=>obs.observe(el));

  const obsGrid = new IntersectionObserver((entries)=>{
    for(const e of entries){
      if(e.isIntersecting){
        e.target.classList.add('in-view');
        obsGrid.unobserve(e.target);
      }
    }
  }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

  grids.forEach(el=>obsGrid.observe(el));
})();
