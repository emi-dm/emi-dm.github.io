// ASCII rain + subtle agent network with passing words
(function(){
  const canvas = document.getElementById('bg-canvas');
  if(!canvas) return;
  const ctx = canvas.getContext('2d');
  let dpr = Math.max(1, window.devicePixelRatio || 1);
  let w, h, raf;

  // Source characters: code-like for agents
  const snippets = [
    'agent.invoke({})',
    'tool.call("/search")',
    'await planner.run()',
    'graph.step()',
    'ctx.memo.set(k,v)',
    'agent.plan("obs")',
    'return action;'
  ];
  const codeChars = Array.from(new Set(snippets.join('')));

  let cell = 22, cols = 0; // larger glyphs
  let streams = [];

  function resize(){
    w = canvas.clientWidth = window.innerWidth;
    h = canvas.clientHeight = window.innerHeight;
    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
    ctx.setTransform(dpr,0,0,dpr,0,0);
    cols = Math.ceil(w / cell);
    init();
  }

  function init(){
    // streams
    streams = Array.from({length: cols}, (_, i) => ({
      x: i*cell + (Math.random()*2|0),
      y: Math.random()*-h,
  speed: 48 + Math.random()*90,
  len: 8 + (Math.random()*16|0),
      t: Math.random()*1000
    }));

  // nothing else to init
  }

  function step(){
    ctx.clearRect(0,0,w,h);
    ctx.font = `${cell}px ui-monospace, SFMono-Regular, Menlo, monospace`;

  // ASCII rain (per-column code characters)
    for(const s of streams){
      s.y += (s.speed * (1/60));
      if(s.y - s.len*cell > h + 40){
        s.y = Math.random()*-h; s.speed = 40 + Math.random()*80; s.len = 6 + (Math.random()*16|0); s.t = Math.random()*1000;
      }
      for(let i=0;i<s.len;i++){
        const yy = s.y - i*cell;
        if(yy < -20 || yy > h+20) continue;
  const alpha = Math.max(0, 0.10 - i*0.0065) + (i===0?0.10:0);
        ctx.fillStyle = `rgba(124,99,255,${alpha.toFixed(3)})`;
    const pick = snippets[(s.x/Math.max(1,cell)) % snippets.length | 0];
    const idx = (i + (s.t/180|0)) % pick.length;
    const g = pick[idx];
        ctx.fillText(g, s.x, yy);
      }
    }
  // no graph/network (removed), no flyers/terms

    raf = requestAnimationFrame(step);
  }

  function start(){
    if(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches){
      ctx.clearRect(0,0,canvas.width,canvas.height);
      return;
    }
    cancelAnimationFrame(raf);
    resize();
    step();
  }

  window.addEventListener('resize', start);
  start();
})();
