document.addEventListener('DOMContentLoaded', () => {
  // Enhanced intersection observer for staggered animations
  const fadeElems = document.querySelectorAll('.fade-in');
  
  const appearOptions = {
    threshold: 0.12,
    rootMargin: "0px 0px -80px 0px" 
  };
  
  const appearOnScroll = new IntersectionObserver(
    (entries, appearOnScroll) => {
      entries.forEach((entry, i) => {
        if (!entry.isIntersecting) return;
        
        // Staggered animation
        setTimeout(() => {
          entry.target.classList.add('appear');
        }, i * 100);
        
        appearOnScroll.unobserve(entry.target);
      });
    }, 
    appearOptions
  );
  
  fadeElems.forEach(elem => {
    appearOnScroll.observe(elem);
    elem.classList.add('fade-in-init');
  });
  
  // Cursor follower with improved performance
  const cursor = document.createElement('div');
  cursor.classList.add('cursor-follower');
  document.body.appendChild(cursor);
  
  let mouseX = 0;
  let mouseY = 0;
  let cursorX = 0;
  let cursorY = 0;
  
  // Use passive event listener for better performance
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  }, { passive: true });
  
  // Enhanced hover effects for interactive elements
  const interactiveElements = document.querySelectorAll('a, button, .framework, .modern-list li, #research li');
  
  interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.classList.add('active');
      
      // Add ripple effect for certain elements
      if (el.classList.contains('framework') || el.closest('#research li')) {
        const ripple = document.createElement('span');
        ripple.classList.add('ripple');
        el.appendChild(ripple);
        
        setTimeout(() => {
          ripple.remove();
        }, 1000);
      }
    });
    
    el.addEventListener('mouseleave', () => {
      cursor.classList.remove('active');
    });
  });
  
  // Smoother cursor animation with requestAnimationFrame
  const animate = () => {
    cursorX += (mouseX - cursorX) * 0.1;
    cursorY += (mouseY - cursorY) * 0.1;
    
    if (cursor) {
      cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
    }
    
    requestAnimationFrame(animate);
  };
  
  animate();
  
  // Parallax effect for decorative elements
  const decorativeElements = document.querySelectorAll('.decorative-line, .decorative-dots');
  
  if (window.innerWidth > 768) {
    window.addEventListener('scroll', () => {
      decorativeElements.forEach(el => {
        const scrollPosition = window.scrollY;
        const parentSection = el.closest('section');
        if (!parentSection) return;
        
        const sectionTop = parentSection.offsetTop;
        const relativeScroll = scrollPosition - sectionTop;
        
        if (relativeScroll > -window.innerHeight && relativeScroll < window.innerHeight) {
          const translateY = relativeScroll * 0.1;
          el.style.transform = `translateY(${translateY}px)`;
        }
      });
    }, { passive: true });
  }
  
  // Interactive elements for research items
  const researchItems = document.querySelectorAll('#research li');
  
  researchItems.forEach(item => {
    // Add subtle hover animation
    item.addEventListener('mouseover', () => {
      const randomColor = `rgba(124, 58, 237, ${Math.random() * 0.2 + 0.1})`;
      item.style.backgroundColor = randomColor;
    });
    
    item.addEventListener('mouseout', () => {
      item.style.backgroundColor = 'var(--bg)';
    });
  });
  
  // Create floating particles for hero section
  function createParticles() {
    const heroSection = document.querySelector('#hero-carousel');
    
    if (!heroSection) return;
    
    const particleContainer = document.createElement('div');
    particleContainer.classList.add('particle-container');
    particleContainer.style.position = 'absolute';
    particleContainer.style.top = '0';
    particleContainer.style.left = '0';
    particleContainer.style.width = '100%';
    particleContainer.style.height = '100%';
    particleContainer.style.pointerEvents = 'none';
    particleContainer.style.zIndex = '1';
    
    heroSection.appendChild(particleContainer);
    
    for (let i = 0; i < 20; i++) {
      const particle = document.createElement('div');
      
      // Random properties
      const size = Math.random() * 10 + 5;
      const posX = Math.random() * 100;
      const posY = Math.random() * 100;
      const opacity = Math.random() * 0.3 + 0.1;
      const animDuration = Math.random() * 20 + 10;
      const animDelay = Math.random() * 5;
      
      // Style
      particle.style.position = 'absolute';
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.borderRadius = '50%';
      particle.style.backgroundColor = 'rgba(255, 255, 255, ' + opacity + ')';
      particle.style.left = `${posX}%`;
      particle.style.top = `${posY}%`;
      particle.style.animation = `float ${animDuration}s ease-in-out infinite`;
      particle.style.animationDelay = `${animDelay}s`;
      
      particleContainer.appendChild(particle);
    }
    
    // Add keyframes for floating animation
    const styleEl = document.createElement('style');
    styleEl.innerHTML = `
      @keyframes float {
        0%, 100% {
          transform: translate(0, 0) rotate(0deg);
        }
        25% {
          transform: translate(${Math.random() * 20}px, ${Math.random() * -20}px) rotate(${Math.random() * 15}deg);
        }
        50% {
          transform: translate(${Math.random() * -20}px, ${Math.random() * 20}px) rotate(${Math.random() * -15}deg);
        }
        75% {
          transform: translate(${Math.random() * 20}px, ${Math.random() * -20}px) rotate(${Math.random() * 15}deg);
        }
      }
    `;
    document.head.appendChild(styleEl);
  }
  
  createParticles();
  
  // Optional: Dark mode toggle with animation
  const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
  
  if (prefersDarkScheme.matches) {
    document.body.classList.add('dark-theme');
  }
  
  // Create dark mode toggle
  function createDarkModeToggle() {
    const toggle = document.createElement('button');
    toggle.classList.add('theme-toggle');
    toggle.setAttribute('aria-label', 'Toggle dark mode');
    toggle.innerHTML = document.body.classList.contains('dark-theme') ? '☀️' : '🌙';
    
    toggle.addEventListener('click', () => {
      // Add transition class before toggling
      document.body.classList.add('theme-transition');
      
      // Toggle theme after a small delay
      setTimeout(() => {
        document.body.classList.toggle('dark-theme');
        toggle.innerHTML = document.body.classList.contains('dark-theme') ? '☀️' : '🌙';
      }, 50);
      
      // Remove transition class
      setTimeout(() => {
        document.body.classList.remove('theme-transition');
      }, 500);
    });
    
    const socialIcons = document.querySelector('.social-icons');
    if (socialIcons) {
      socialIcons.appendChild(toggle);
    }
  }
  
  // Uncomment to enable the dark mode toggle
  // createDarkModeToggle();
  
  // Add theme transition styles
  const themeStyle = document.createElement('style');
  themeStyle.innerHTML = `
    .theme-transition * {
      transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease !important;
    }
  `;
  document.head.appendChild(themeStyle);
  
  // Header scroll effect for better visibility
  const header = document.querySelector('header');
  const scrollThreshold = 100; // Adjust based on when you want the effect to trigger
  
  function updateHeaderOnScroll() {
    if (window.scrollY > scrollThreshold) {
      header.classList.add('header-scrolled');
    } else {
      header.classList.remove('header-scrolled');
    }
  }
  
  // Initial check in case page is loaded scrolled down
  updateHeaderOnScroll();
  
  // Add scroll event listener with passive option for better performance
  window.addEventListener('scroll', updateHeaderOnScroll, { passive: true });

  // Enhanced scroll effects with parallax
  const parallaxElements = document.querySelectorAll('.container h2, .profile-container, .decorative-dots');
  
  function parallaxScroll() {
    const scrollPosition = window.scrollY;
    
    parallaxElements.forEach(element => {
      const section = element.closest('section');
      if (!section) return;
      
      const sectionTop = section.offsetTop;
      const elementOffsetTop = element.offsetTop + sectionTop;
      
      // Check if element is in view
      if (scrollPosition + window.innerHeight > elementOffsetTop && 
          scrollPosition < elementOffsetTop + element.offsetHeight) {
        
        // Calculate parallax offset (adjust the divisor for effect strength)
        const parallaxOffset = (scrollPosition - sectionTop) / 6;
        
        if (element.classList.contains('profile-container')) {
          element.style.transform = `translateY(${parallaxOffset * 0.2}px)`;
        } else if (element.tagName === 'H2') {
          element.style.transform = `translateX(${-10 + parallaxOffset * 0.1}px)`;
        } else if (element.classList.contains('decorative-dots')) {
          element.style.transform = `translateY(${parallaxOffset * -0.3}px) rotate(${parallaxOffset * 0.05}deg)`;
        }
      }
    });
  }
  
  // Only apply parallax on desktop
  if (window.innerWidth > 768) {
    window.addEventListener('scroll', parallaxScroll, { passive: true });
    // Initial check
    parallaxScroll();
  }
  
  // Add blob shadow hover effect for interactive elements
  // Create a map to track which elements already have hover effects
  const processedElements = new WeakMap();
  
  const addBlobEffect = (elements) => {
    elements.forEach(el => {
      // Skip if already processed or nav links/social icons
      if (processedElements.has(el) || 
          el.classList.contains('nav-links') || 
          el.classList.contains('social-icons')) return;
      
      processedElements.set(el, true);
      
      el.addEventListener('mouseenter', function(e) {
        // Create blob shadow element if it doesn't exist yet
        if (!el.querySelector('.blob-shadow')) {
          const blob = document.createElement('div');
          blob.classList.add('blob-shadow');
          el.appendChild(blob);
          
          // Position the blob relative to mouse position inside element
          const rect = el.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          
          blob.style.left = `${x}px`;
          blob.style.top = `${y}px`;
          
          // Add animation class after a small delay for the initial position to take effect
          setTimeout(() => {
            blob.classList.add('animate');
          }, 10);
          
          // Remove the blob after animation completes
          el.addEventListener('mouseleave', function() {
            blob.classList.remove('animate');
            blob.classList.add('fade-out');
            
            setTimeout(() => {
              if (blob && blob.parentNode === el) {
                el.removeChild(blob);
              }
            }, 300);
          }, { once: true });
        }
      });
      
      // Track mouse movement for blob movement
      el.addEventListener('mousemove', function(e) {
        const blob = el.querySelector('.blob-shadow');
        if (blob) {
          const rect = el.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          
          blob.style.left = `${x}px`;
          blob.style.top = `${y}px`;
        }
      });
    });
  };
  
  // Add blob effect to new interactive elements
  const linkElements = document.querySelectorAll('a:not(.nav-links a), button:not(.menu-toggle), .framework, .modern-list li, #research li');
  addBlobEffect(linkElements);
  
  // Form field animations
  const formGroups = document.querySelectorAll('.form-group');
  formGroups.forEach((group, i) => {
    // Set stagger delay
    group.style.transitionDelay = `${i * 100}ms`;
    
    const input = group.querySelector('input, textarea');
    if (!input) return;
    
    // Add floating label effect
    input.addEventListener('focus', () => {
      group.classList.add('focused');
    });
    
    input.addEventListener('blur', () => {
      if (!input.value) {
        group.classList.remove('focused');
      }
    });
    
    // Check if there's already a value
    if (input.value) {
      group.classList.add('focused');
    }
  });
  
  // Add combined styles
  const combinedStyles = document.createElement('style');
  combinedStyles.innerHTML = `
    .blob-shadow {
      position: absolute;
      width: 40px;
      height: 40px;
      background: var(--primary);
      border-radius: 50%;
      opacity: 0.1;
      pointer-events: none;
      z-index: -1;
      transform: translate(-50%, -50%) scale(0);
      transition: transform 0s;
    }
    
    .blob-shadow.animate {
      transform: translate(-50%, -50%) scale(6);
      transition: transform 0.6s cubic-bezier(0.17, 0.85, 0.438, 1);
    }
    
    .blob-shadow.fade-out {
      opacity: 0;
      transition: opacity 0.3s ease;
    }
    
    .form-group.focused .form-highlight {
      width: 100%;
    }
    
    .research-card-content {
      position: relative;
      z-index: 1;
    }
    
    /* Improved scrollbar for smooth scrolling */
    ::-webkit-scrollbar-thumb {
      transition: background-color 0.3s;
    }
    
    ::-webkit-scrollbar-thumb:hover {
      background: rgba(124, 58, 237, 0.5);
    }
    
    /* Scroll Indicator */
    .scroll-indicator {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      height: 3px;
      background: var(--primary);
      transform-origin: left;
      transform: scaleX(0);
      z-index: 1001;
    }
  `;
  document.head.appendChild(combinedStyles);
  
  // Create scroll indicator
  const scrollIndicator = document.createElement('div');
  scrollIndicator.classList.add('scroll-indicator');
  document.body.appendChild(scrollIndicator);
  
  function updateScrollIndicator() {
    const scrollPercent = (window.scrollY) / (document.body.scrollHeight - window.innerHeight);
    scrollIndicator.style.transform = `scaleX(${scrollPercent})`;
  }
  
  window.addEventListener('scroll', updateScrollIndicator, { passive: true });
  updateScrollIndicator(); // Initial check

  // Add tilt effect to carousel slides
  const carouselItems = document.querySelectorAll('.carousel-item');
  
  carouselItems.forEach(item => {
    item.addEventListener('mousemove', (e) => {
      // Only apply effect if screen width is larger than 1024px
      if (window.innerWidth < 1024) return;
      
      const rect = item.getBoundingClientRect();
      const x = e.clientX - rect.left; // x position within the element
      const y = e.clientY - rect.top;  // y position within the element
      
      const xTilt = ((x / rect.width) - 0.5) * 10; // -5 to 5 degree tilt
      const yTilt = ((y / rect.height) - 0.5) * -10; // 5 to -5 degree tilt
      
      // Apply subtle tilt effect to the content
      const content = item.querySelector('.carousel-content');
      if (content) {
        content.style.transform = `perspective(1000px) rotateX(${yTilt}deg) rotateY(${xTilt}deg) scale3d(1.02, 1.02, 1.02)`;
      }
      
      // Move decoration element for parallax effect
      const decoration = item.querySelector('.slide-decoration');
      if (decoration) {
        const moveX = ((x / rect.width) - 0.5) * 30; // -15 to 15px movement
        const moveY = ((y / rect.height) - 0.5) * 30; // -15 to 15px movement
        decoration.style.transform = `translate(${moveX}px, ${moveY}px)`;
      }
    });
    
    // Reset transformations when mouse leaves
    item.addEventListener('mouseleave', () => {
      const content = item.querySelector('.carousel-content');
      if (content) {
        content.style.transform = '';
      }
      
      const decoration = item.querySelector('.slide-decoration');
      if (decoration) {
        decoration.style.transform = '';
      }
    });
  });
  
  // Add particle effects to carousel
  function enhanceCarousel() {
    const carousel = document.querySelector('.modern-carousel');
    if (!carousel) return;
    
    // Create canvas for particles
    const canvas = document.createElement('canvas');
    canvas.classList.add('carousel-particles');
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '1';
    carousel.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    function setCanvasSize() {
      canvas.width = carousel.offsetWidth;
      canvas.height = carousel.offsetHeight;
    }
    
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);
    
    // Create particles
    const particlesArray = [];
    const numberOfParticles = 40;
    
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
        this.opacity = Math.random() * 0.5 + 0.2;
      }
      
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        
        if (this.size > 0.2) this.size -= 0.01;
        
        // Reset particle if it's gone out of bounds or too small
        if (this.x < 0 || this.x > canvas.width || 
            this.y < 0 || this.y > canvas.height || 
            this.size <= 0.2) {
          this.x = Math.random() * canvas.width;
          this.y = Math.random() * canvas.height;
          this.size = Math.random() * 3 + 1;
          this.opacity = Math.random() * 0.5 + 0.2;
        }
      }
      
      draw() {
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    
    function init() {
      for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle());
      }
    }
    
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
      }
      
      requestAnimationFrame(animate);
    }
    
    init();
    animate();
  }
  
  enhanceCarousel();

  // Fix carousel height issues
  function fixCarouselHeight() {
    const carousel = document.querySelector('.modern-carousel');
    if (!carousel) return;
    
    const items = carousel.querySelectorAll('.carousel-item');
    items.forEach(item => {
      item.style.height = '100vh';
    });
    
    // Fix slick slider height
    const slickList = carousel.querySelector('.slick-list');
    const slickTrack = carousel.querySelector('.slick-track');
    
    if (slickList) slickList.style.height = '100%';
    if (slickTrack) slickTrack.style.height = '100%';
  }
  
  window.addEventListener('load', fixCarouselHeight);
  window.addEventListener('resize', fixCarouselHeight);
});
