// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile navigation toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle mobile menu
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Navbar background change on scroll
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(250, 250, 250, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(1, 117, 194, 0.1)';
        } else {
            navbar.style.background = 'rgba(250, 250, 250, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });

    // Active navigation link highlighting
    const sections = document.querySelectorAll('section[id]');
    
    function highlightNavLink() {
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (navLink) {
                    navLink.classList.add('active');
                }
            }
        });
    }

    window.addEventListener('scroll', highlightNavLink);

    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Elements to animate on scroll
    const animateElements = document.querySelectorAll('.skill-category, .project-card, .timeline-item, .cert-item, .contact-item, .hero-text, .hero-image');
    
    animateElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = `opacity 0.8s ease ${index * 0.1}s, transform 0.8s ease ${index * 0.1}s`;
        observer.observe(element);
    });

    // Typing animation for hero title
    const heroTitle = document.querySelector('.hero-title');
    const titleText = 'Hi, I\'m Muhammad Umar Bhatti';
    const highlightText = 'Muhammad Umar Bhatti';
    
    function typeWriter() {
        heroTitle.innerHTML = '';
        let i = 0;
        const speed = 80;
        
        function type() {
            if (i < titleText.length) {
                const currentText = titleText.substring(0, i + 1);
                
                // Check if we're at the highlight part
                if (currentText.includes('Muhammad Umar Bhatti')) {
                    const beforeHighlight = 'Hi, I\'m ';
                    const highlightPart = currentText.substring(beforeHighlight.length);
                    heroTitle.innerHTML = beforeHighlight + '<span class="highlight">' + highlightPart + '</span>';
                } else {
                    heroTitle.innerHTML = currentText;
                }
                
                i++;
                setTimeout(type, speed);
            }
        }
        
        // Start typing animation after a short delay
        setTimeout(type, 800);
    }

    // Start typing animation when page loads
    typeWriter();

    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxElement = document.querySelector('.hero');
        
        if (parallaxElement) {
            const speed = scrolled * 0.5;
            parallaxElement.style.transform = `translateY(${speed}px)`;
        }
    });

    // Skills hover animation
    const skillItems = document.querySelectorAll('.skill-item');
    
    skillItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(10px) scale(1.02)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0) scale(1)';
        });
    });

    // Project cards hover effect
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-12px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Contact form animation (if added later)
    const contactButtons = document.querySelectorAll('.contact .btn');
    
    contactButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Add CSS for ripple effect
    const style = document.createElement('style');
    style.textContent = `
        .btn {
            position: relative;
            overflow: hidden;
        }
        
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.6);
            transform: scale(0);
            animation: ripple-animation 0.6s linear;
            pointer-events: none;
        }
        
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    // Scroll to top functionality
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        background-color: var(--primary-color);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        font-size: 1.2rem;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 20px rgba(1, 117, 194, 0.3);
    `;
    
    document.body.appendChild(scrollToTopBtn);
    
    // Show/hide scroll to top button
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            scrollToTopBtn.style.opacity = '1';
            scrollToTopBtn.style.visibility = 'visible';
        } else {
            scrollToTopBtn.style.opacity = '0';
            scrollToTopBtn.style.visibility = 'hidden';
        }
    });
    
    // Scroll to top functionality
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Loading animation for page
    window.addEventListener('load', function() {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.5s ease';
        
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
    });

    // Enhanced mobile menu animation
    function toggleMobileMenu() {
        const bars = document.querySelectorAll('.hamburger .bar');
        
        if (hamburger.classList.contains('active')) {
            bars[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            bars[1].style.opacity = '0';
            bars[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            bars[0].style.transform = 'none';
            bars[1].style.opacity = '1';
            bars[2].style.transform = 'none';
        }
    }

    hamburger.addEventListener('click', toggleMobileMenu);

    // Performance optimization: Throttle scroll events
    function throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    }

    // Apply throttling to scroll events
    window.addEventListener('scroll', throttle(function() {
        highlightNavLink();
    }, 100));

    // Preload critical images
    function preloadImages() {
        const imageUrls = [
            // Add any image URLs that need to be preloaded
        ];
        
        imageUrls.forEach(url => {
            const img = new Image();
            img.src = url;
        });
    }

    preloadImages();

    // Add focus management for accessibility
    const focusableElements = document.querySelectorAll('a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])');
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            // Enhanced tab navigation
            const currentFocus = document.activeElement;
            const focusableArray = Array.from(focusableElements);
            const currentIndex = focusableArray.indexOf(currentFocus);
            
            if (e.shiftKey) {
                // Shift + Tab (backwards)
                if (currentIndex === 0) {
                    e.preventDefault();
                    focusableArray[focusableArray.length - 1].focus();
                }
            } else {
                // Tab (forwards)
                if (currentIndex === focusableArray.length - 1) {
                    e.preventDefault();
                    focusableArray[0].focus();
                }
            }
        }
        
        // Escape key to close mobile menu
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            toggleMobileMenu();
        }
    });

    // Add touch gestures for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    document.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    document.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
    
    function handleSwipe() {
        if (touchEndX < touchStartX - 50) {
            // Swipe left - could be used for navigation
            console.log('Swiped left');
        }
        if (touchEndX > touchStartX + 50) {
            // Swipe right - could be used for navigation
            console.log('Swiped right');
        }
    }

    // Stats counter animation
    const stats = document.querySelectorAll('.stat h3');
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalValue = parseInt(target.textContent);
                let currentValue = 0;
                const increment = Math.ceil(finalValue / 30);
                
                const counter = setInterval(() => {
                    currentValue += increment;
                    if (currentValue >= finalValue) {
                        target.textContent = finalValue + '+';
                        clearInterval(counter);
                    } else {
                        target.textContent = currentValue + '+';
                    }
                }, 80);
                
                statsObserver.unobserve(target);
            }
        });
    });
    
    stats.forEach(stat => statsObserver.observe(stat));

    // Enhanced skill items animation
    const skillItemsAdvanced = document.querySelectorAll('.skill-item');
    const skillCategories = document.querySelectorAll('.skill-category');
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillItems = entry.target.querySelectorAll('.skill-item');
                skillItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateX(0)';
                    }, index * 150);
                });
            }
        });
    });

    skillCategories.forEach(category => {
        const skillItems = category.querySelectorAll('.skill-item');
        skillItems.forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'translateX(-30px)';
            item.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        });
        skillObserver.observe(category);
    });

    // Enhanced project card animations
    const projectCardsAdvanced = document.querySelectorAll('.project-card');
    projectCardsAdvanced.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.02)';
            this.style.boxShadow = '0 20px 40px rgba(1, 117, 194, 0.15)';
            
            // Add subtle rotation to project icon
            const icon = this.querySelector('.project-icon');
            if (icon) {
                icon.style.transform = 'rotate(10deg) scale(1.1)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 4px 20px rgba(1, 117, 194, 0.1)';
            
            const icon = this.querySelector('.project-icon');
            if (icon) {
                icon.style.transform = 'rotate(0deg) scale(1)';
            }
        });
    });

    // Typing animation for hero subtitle
    setTimeout(() => {
        const heroSubtitle = document.querySelector('.hero-subtitle');
        const subtitleText = 'IT Graduate | Mobile App Developer | AI Enthusiast';
        heroSubtitle.innerHTML = '';
        
        let j = 0;
        function typeSubtitle() {
            if (j < subtitleText.length) {
                heroSubtitle.innerHTML += subtitleText.charAt(j);
                j++;
                setTimeout(typeSubtitle, 50);
            }
        }
        typeSubtitle();
    }, 3000);

    // Add floating particles animation
    function createFloatingParticles() {
        const heroSection = document.querySelector('.hero');
        for (let i = 0; i < 15; i++) {
            const particle = document.createElement('div');
            particle.className = 'floating-particle';
            particle.style.cssText = `
                position: absolute;
                width: ${Math.random() * 6 + 2}px;
                height: ${Math.random() * 6 + 2}px;
                background-color: rgba(1, 117, 194, 0.3);
                border-radius: 50%;
                top: ${Math.random() * 100}%;
                left: ${Math.random() * 100}%;
                animation: float-particle ${Math.random() * 10 + 10}s infinite linear;
                z-index: 1;
            `;
            heroSection.appendChild(particle);
        }
    }

    // Add CSS for floating particles
    const particleStyle = document.createElement('style');
    particleStyle.textContent = `
        @keyframes float-particle {
            0% {
                transform: translateY(100vh) rotate(0deg);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            100% {
                transform: translateY(-100vh) rotate(360deg);
                opacity: 0;
            }
        }
        
        .project-icon {
            transition: transform 0.3s ease;
        }
    `;
    document.head.appendChild(particleStyle);
    
    createFloatingParticles();

    // Dark mode functionality
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = themeToggle.querySelector('i');
    
    // Check for saved theme preference or default to light mode
    const currentTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    // Update icon based on current theme
    if (currentTheme === 'dark') {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    }
    
    // Theme toggle functionality
    themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        // Update theme
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Update icon with animation
        themeIcon.style.transform = 'rotate(180deg)';
        
        setTimeout(() => {
            if (newTheme === 'dark') {
                themeIcon.classList.remove('fa-moon');
                themeIcon.classList.add('fa-sun');
            } else {
                themeIcon.classList.remove('fa-sun');
                themeIcon.classList.add('fa-moon');
            }
            themeIcon.style.transform = 'rotate(0deg)';
        }, 150);
        
        // Add a subtle animation to the body
        document.body.style.transition = 'background-color 0.5s ease, color 0.5s ease';
    });

    // Update navbar background on scroll to match theme
    window.addEventListener('scroll', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        if (window.scrollY > 100) {
            navbar.style.background = currentTheme === 'dark' ? 
                'rgba(18, 18, 18, 0.98)' : 'rgba(250, 250, 250, 0.98)';
            navbar.style.boxShadow = currentTheme === 'dark' ? 
                '0 2px 20px rgba(0, 0, 0, 0.3)' : '0 2px 20px rgba(1, 117, 194, 0.1)';
        } else {
            navbar.style.background = currentTheme === 'dark' ? 
                'rgba(18, 18, 18, 0.95)' : 'rgba(250, 250, 250, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });

    console.log('Portfolio loaded successfully! 🚀');
});