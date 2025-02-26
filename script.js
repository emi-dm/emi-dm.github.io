document.addEventListener('DOMContentLoaded', () => {
  // Intersection Observer for fade-in effects
  const fadeElems = document.querySelectorAll('.fade-in');
  
  const appearOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -100px 0px"
  };
  
  const appearOnScroll = new IntersectionObserver(
    (entries, appearOnScroll) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('appear');
        appearOnScroll.unobserve(entry.target);
      });
    }, 
    appearOptions
  );
  
  fadeElems.forEach(elem => {
    appearOnScroll.observe(elem);
    // Add initial state
    elem.classList.add('fade-in-init');
  });
  
  // Cursor follower for modern interactive feel (subtle)
  const cursor = document.createElement('div');
  cursor.classList.add('cursor-follower');
  document.body.appendChild(cursor);
  
  let mouseX = 0;
  let mouseY = 0;
  let cursorX = 0;
  let cursorY = 0;
  
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });
  
  // Hover effect for interactive elements
  const interactiveElements = document.querySelectorAll('a, button, .framework, .modern-list li');
  
  interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.classList.add('active');
    });
    
    el.addEventListener('mouseleave', () => {
      cursor.classList.remove('active');
    });
  });
  
  // Animation loop for smooth cursor following
  const animate = () => {
    cursorX += (mouseX - cursorX) * 0.1;
    cursorY += (mouseY - cursorY) * 0.1;
    
    if (cursor) {
      cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
    }
    
    requestAnimationFrame(animate);
  };
  
  animate();
  
  // Add smooth transition between sections
  const mainContent = document.querySelector('main') || document.body;
  
  // Only apply on desktop
  if (window.innerWidth > 768) {
    window.addEventListener('scroll', () => {
      const scrollPosition = window.scrollY;
      mainContent.style.transform = `translateY(${scrollPosition * 0.02}px)`;
    });
  }
  
  // Dark mode toggle if needed
  const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
  
  if (prefersDarkScheme.matches) {
    document.body.classList.add('dark-theme');
  }
  
  // Optional: Add a dark mode toggle button
  const createDarkModeToggle = () => {
    const toggle = document.createElement('button');
    toggle.classList.add('theme-toggle');
    toggle.setAttribute('aria-label', 'Toggle dark mode');
    toggle.innerHTML = '☀️';
    
    toggle.addEventListener('click', () => {
      document.body.classList.toggle('dark-theme');
      toggle.innerHTML = document.body.classList.contains('dark-theme') ? '☀️' : '🌙';
    });
    
    document.querySelector('.social-icons').appendChild(toggle);
  };
  
  // Uncomment to enable dark mode toggle
  // createDarkModeToggle();
});
