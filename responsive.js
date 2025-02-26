/**
 * Enhanced responsive features for the website
 */

// Navbar scroll behavior
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.padding = '10px 0';
        navbar.style.backgroundColor = 'rgba(51, 51, 51, 0.95)';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.padding = '15px 0';
        navbar.style.backgroundColor = '#333';
        navbar.style.boxShadow = 'none';
    }
});

// Lazy loading images
document.addEventListener('DOMContentLoaded', function() {
    let lazyImages = [].slice.call(document.querySelectorAll('img.lazy'));
    
    if ('IntersectionObserver' in window) {
        let lazyImageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    let lazyImage = entry.target;
                    lazyImage.src = lazyImage.dataset.src;
                    lazyImage.classList.remove('lazy');
                    lazyImageObserver.unobserve(lazyImage);
                }
            });
        });
        
        lazyImages.forEach(function(lazyImage) {
            lazyImageObserver.observe(lazyImage);
        });
    }
});

// Handle viewport height for mobile browsers
const setVH = () => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
};

window.addEventListener('resize', setVH);
window.addEventListener('orientationchange', setVH);
setVH();

// Add touch swipe support for carousel
document.addEventListener('DOMContentLoaded', function() {
    let touchstartX = 0;
    let touchendX = 0;
    const carousel = document.getElementById('hero-carousel');
    
    if (carousel) {
        carousel.addEventListener('touchstart', function(e) {
            touchstartX = e.changedTouches[0].screenX;
        }, false);
        
        carousel.addEventListener('touchend', function(e) {
            touchendX = e.changedTouches[0].screenX;
            handleSwipe();
        }, false);
        
        function handleSwipe() {
            if (touchendX < touchstartX) {
                // Swipe left, next slide
                $('.slick-next').click();
            }
            if (touchendX > touchstartX) {
                // Swipe right, previous slide
                $('.slick-prev').click();
            }
        }
    }
});

// Add resize handler for text
const resizeText = () => {
    const width = window.innerWidth;
    const heroTitle = document.querySelectorAll('#hero-carousel h1');
    
    if (width < 576) {
        heroTitle.forEach(title => {
            title.style.fontSize = '1.5rem';
        });
    } else if (width < 768) {
        heroTitle.forEach(title => {
            title.style.fontSize = '2rem';
        });
    } else {
        heroTitle.forEach(title => {
            title.style.fontSize = '3.5rem';
        });
    }
};

window.addEventListener('resize', resizeText);
document.addEventListener('DOMContentLoaded', resizeText);

// Detect slow connections and optimize
document.addEventListener('DOMContentLoaded', function() {
    if ('connection' in navigator) {
        const connection = navigator.connection;
        if (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g') {
            // Disable animations for better performance
            document.querySelectorAll('[data-aos]').forEach(el => {
                el.removeAttribute('data-aos');
            });
            
            // Reduce image quality
            document.querySelectorAll('img').forEach(img => {
                if (img.src.includes('.jpg') || img.src.includes('.png')) {
                    img.style.filter = 'blur(0px)';
                }
            });
        }
    }
});
