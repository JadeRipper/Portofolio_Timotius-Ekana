// Theme toggle functionality
function toggleTheme() {
    const body = document.body;
    const currentTheme = body.getAttribute('data-theme');
    
    if (currentTheme === 'light') {
        body.removeAttribute('data-theme');
        localStorage.setItem('theme', 'dark');
    } else {
        body.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
    }
}

// Load saved theme on page load
document.addEventListener('DOMContentLoaded', function() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.body.setAttribute('data-theme', 'light');
    }
});

// Enhanced interactivity and animations
document.addEventListener('DOMContentLoaded', function () {
    // Create floating particles
    function createParticles() {
        const particles = document.getElementById('particles');
        for (let i = 0; i < 30; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 15 + 's';
            particle.style.animationDuration = (15 + Math.random() * 10) + 's';
            particles.appendChild(particle);
        }
    }

    // Matrix rain effect
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

    createParticles();
    createMatrixRain();

    // Enhanced scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('section').forEach(el => {
        observer.observe(el);
    });

    // Header scroll effect
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

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
});

// Interactive profile image functions - FIXED VERSION
let currentFilter = false;

function changeShape(shape) {
    const profileImage = document.getElementById('profileImage');
    const profileWrapper = document.getElementById('profileWrapper');
    
    // Reset all shape properties first
    profileImage.style.setProperty('--clip-path', 'none');
    profileImage.style.clipPath = 'none';
    
    switch(shape) {
        case 'circle':
            profileImage.style.setProperty('--border-radius', '50%');
            break;
        case 'square':
            profileImage.style.setProperty('--border-radius', '10%');
            break;
        case 'hexagon':
            profileImage.style.setProperty('--border-radius', '0');
            profileImage.style.setProperty('--clip-path', 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)');
            profileImage.style.clipPath = 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)';
            break;
    }
    
    // Add bounce effect
    profileWrapper.style.transform = 'scale(1.1)';
    setTimeout(() => {
        profileWrapper.style.transform = 'scale(1)';
    }, 200);
}

function toggleFilter() {
    const profileImage = document.getElementById('profileImage');
    currentFilter = !currentFilter;
    
    if (currentFilter) {
        profileImage.style.setProperty('--image-filter', 'hue-rotate(180deg) saturate(150%)');
    } else {
        profileImage.style.setProperty('--image-filter', 'none');
    }
    
    // Add glow effect
    profileImage.style.boxShadow = currentFilter ? 
        'var(--glow-green), 0 20px 60px rgba(0, 255, 136, 0.5)' : 
        'var(--glow-cyan), 0 20px 60px rgba(0, 0, 0, 0.5)';
}

// Add click effect to skill items
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.skill-list li').forEach(skill => {
        skill.addEventListener('click', function() {
            this.style.background = 'var(--gradient-primary)';
            this.style.color = 'white';
            this.style.transform = 'translateX(15px) scale(1.05)';
            
            setTimeout(() => {
                this.style.background = '';
                this.style.color = '';
                this.style.transform = '';
            }, 1000);
        });
    });

    // Add pulse effect to project cards
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('click', function() {
            this.style.animation = 'pulse 0.5s ease-in-out';
            setTimeout(() => {
                this.style.animation = '';
            }, 500);
        });
    });
});