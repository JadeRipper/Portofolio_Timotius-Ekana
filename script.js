document.addEventListener('DOMContentLoaded', function () {
    // Burger menu functionality
    const burger = document.getElementById('burger');
    const navMenu = document.getElementById('navMenu');

    burger.addEventListener('click', function() {
        burger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking on a link
    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            burger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Smooth scroll for navigation links
    document.querySelectorAll('nav a.nav-link, .btn').forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.replace('#', '');
                const target = document.getElementById(targetId);
                if (target) {
                    const headerHeight = document.querySelector('header').offsetHeight;
                    window.scrollTo({
                        top: target.offsetTop - headerHeight - 20,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Fade-in animation on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });

    // Active navigation highlighting
    const sections = Array.from(document.querySelectorAll('main > section[id]'));
    window.addEventListener('scroll', () => {
        const scrollPos = window.scrollY + document.querySelector('header').offsetHeight + 50;
        let current = sections[0].id;
        
        for (const section of sections) {
            if (section.offsetTop <= scrollPos) {
                current = section.id;
            }
        }
        
        document.querySelectorAll('nav a.nav-link').forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === '#' + current);
        });
    });

    // Matrix rain effect (subtle)
    const matrixChars = '01';
    const matrixBg = document.querySelector('.matrix-bg');
    
    function createMatrixRain() {
        for (let i = 0; i < 50; i++) {
            const span = document.createElement('span');
            span.textContent = matrixChars[Math.floor(Math.random() * matrixChars.length)];
            span.style.position = 'absolute';
            span.style.left = Math.random() * 100 + '%';
            span.style.animationDuration = (Math.random() * 3 + 2) + 's';
            span.style.animationDelay = Math.random() * 2 + 's';
            span.style.color = 'rgba(0, 255, 136, 0.1)';
            span.style.fontFamily = 'JetBrains Mono';
            span.style.animation = `matrixFall ${Math.random() * 3 + 2}s linear infinite`;
            matrixBg.appendChild(span);
        }
    }

    // Add matrix fall animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes matrixFall {
            to {
                transform: translateY(100vh);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    createMatrixRain();
});