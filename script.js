document.addEventListener('DOMContentLoaded', function() {
    // Create nebula particles
    createNebulaEffect();
    
    // Mobile Menu Toggle
    setupMobileMenu();
    
    // Font Switcher
    setupFontSwitcher();
    
    // Smooth scrolling for navigation links
    setupSmoothScrolling();
    
    // Form submission (prevent default for demo)
    setupContactForm();
});

// Create nebula particles animation
function createNebulaEffect() {
    const body = document.querySelector('body');
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('nebula-particle');
        
        // Random size
        const size = Math.random() * 15 + 5;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Random position
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        particle.style.left = `${posX}%`;
        particle.style.top = `${posY}%`;
        
        // Random color - using blues, purples, and pinks for nebula effect
        const colors = [
            'rgba(141, 162, 251, 0.4)',
            'rgba(164, 80, 244, 0.4)',
            'rgba(224, 67, 204, 0.4)',
            'rgba(116, 168, 240, 0.4)',
            'rgba(89, 131, 240, 0.4)'
        ];
        const color = colors[Math.floor(Math.random() * colors.length)];
        particle.style.backgroundColor = color;
        
        // Random opacity
        particle.style.opacity = Math.random() * 0.7 + 0.3;
        
        // Animation duration
        const duration = Math.random() * 15 + 10;
        
        // Add floating animation
        const keyframes = `
        @keyframes float${i} {
            0%, 100% {
                transform: translate(0, 0) scale(1);
            }
            50% {
                transform: translate(${Math.random() * 50 - 25}px, ${Math.random() * 50 - 25}px) scale(${Math.random() * 0.5 + 1});
            }
        }`;
        
        const style = document.createElement('style');
        style.textContent = keyframes;
        document.head.appendChild(style);
        
        particle.style.animation = `float${i} ${duration}s ease-in-out infinite`;
        
        body.appendChild(particle);
    }
}

// Mobile Menu Toggle
function setupMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            
            // Toggle between bars and times icon
            const icon = this.querySelector('i');
            if (icon.classList.contains('fa-bars')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Close mobile menu when a link is clicked
    const menuLinks = document.querySelectorAll('.nav-links a');
    if (menuLinks.length > 0) {
        menuLinks.forEach(link => {
            link.addEventListener('click', function() {
                navLinks.classList.remove('active');
                const icon = mobileMenuBtn.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            });
        });
    }
}

// Font Switcher
function setupFontSwitcher() {
    const fontOptions = document.querySelectorAll('.font-option');
    
    if (fontOptions.length > 0) {
        fontOptions.forEach(option => {
            option.addEventListener('click', function() {
                // Remove active class from all options
                fontOptions.forEach(opt => opt.classList.remove('active'));
                
                // Add active class to clicked option
                this.classList.add('active');
                
                // Change the font
                const font = this.getAttribute('data-font');
                document.documentElement.style.setProperty('--font-family', `'${font}', sans-serif`);
                
                // Apply the font directly to the body as well (for better browser compatibility)
                document.body.style.fontFamily = `'${font}', sans-serif`;
                
                // Store the selected font in localStorage for persistence
                localStorage.setItem('preferred-font', font);
            });
        });
        
        // Load saved font preference if it exists
        const savedFont = localStorage.getItem('preferred-font');
        if (savedFont) {
            document.documentElement.style.setProperty('--font-family', `'${savedFont}', sans-serif`);
            document.body.style.fontFamily = `'${savedFont}', sans-serif`;
            
            // Update the active class on the font switcher
            fontOptions.forEach(option => {
                if (option.getAttribute('data-font') === savedFont) {
                    option.classList.add('active');
                } else {
                    option.classList.remove('active');
                }
            });
        }
    }
}

// Smooth scrolling for navigation links
function setupSmoothScrolling() {
    const scrollLinks = document.querySelectorAll('a[href^="#"]');
    
    if (scrollLinks.length > 0) {
        scrollLinks.forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 70,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
}

// Form submission (prevent default for demo)
function setupContactForm() {
    const contactForm = document.querySelector('.contact-form form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your message! I will get back to you soon.');
            this.reset();
        });
    }
}
