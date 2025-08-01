// ===== GLOBAL VARIABLES =====
let currentTestimonial = 0;
let isAnnualPricing = false;
let heroChart;
let isScrolling = false;
let lastScrollTop = 0;

// ===== DOM ELEMENTS =====
const elements = {
    loadingScreen: null,
    navbar: null,
    navToggle: null,
    navMenu: null,
    backToTop: null,
    pricingToggle: null,
    testimonialTrack: null,
    testimonialDots: null,
    contactForm: null,
    demoModal: null,
    notificationContainer: null
};

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    initializeElements();
    initializeLoadingScreen();
    initializeNavigation();
    initializeHeroChart();
    initializeCounters();
    initializePricing();
    initializeTestimonials();
    initializeContactForm();
    initializeModals();
    initializeScrollEffects();
    initializeAOS();
    initializeParticles();
    
    // Hide loading screen after everything is loaded
    setTimeout(() => {
        hideLoadingScreen();
    }, 2000);
});

// ===== ELEMENT INITIALIZATION =====
function initializeElements() {
    elements.loadingScreen = document.getElementById('loadingScreen');
    elements.navbar = document.getElementById('navbar');
    elements.navToggle = document.getElementById('navToggle');
    elements.navMenu = document.getElementById('navMenu');
    elements.backToTop = document.getElementById('backToTop');
    elements.pricingToggle = document.getElementById('pricingToggle');
    elements.testimonialTrack = document.getElementById('testimonialTrack');
    elements.testimonialDots = document.getElementById('testimonialDots');
    elements.contactForm = document.getElementById('contactForm');
    elements.demoModal = document.getElementById('demoModal');
    elements.notificationContainer = document.getElementById('notificationContainer');
}

// ===== LOADING SCREEN =====
function initializeLoadingScreen() {
    if (!elements.loadingScreen) return;
    
    // Add loading animation
    const loadingLogo = elements.loadingScreen.querySelector('.loading-logo i');
    if (loadingLogo) {
        loadingLogo.style.animation = 'rotate 2s linear infinite';
    }
}

function hideLoadingScreen() {
    if (!elements.loadingScreen) return;
    
    elements.loadingScreen.classList.add('hidden');
    
    setTimeout(() => {
        elements.loadingScreen.style.display = 'none';
    }, 500);
}

// ===== NAVIGATION =====
function initializeNavigation() {
    if (!elements.navbar || !elements.navToggle || !elements.navMenu) return;
    
    // Mobile menu toggle
    elements.navToggle.addEventListener('click', toggleMobileMenu);
    
    // Close mobile menu when clicking on links
    const navLinks = elements.navMenu.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });
    
    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 70;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Navbar scroll effect
    window.addEventListener('scroll', throttle(handleNavbarScroll, 16));
}

function toggleMobileMenu() {
    elements.navToggle.classList.toggle('active');
    elements.navMenu.classList.toggle('active');
    document.body.style.overflow = elements.navMenu.classList.contains('active') ? 'hidden' : '';
}

function closeMobileMenu() {
    elements.navToggle.classList.remove('active');
    elements.navMenu.classList.remove('active');
    document.body.style.overflow = '';
}

function handleNavbarScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 100) {
        elements.navbar.classList.add('scrolled');
    } else {
        elements.navbar.classList.remove('scrolled');
    }
    
    // Update active navigation link
    updateActiveNavLink();
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// ===== HERO CHART =====
function initializeHeroChart() {
    const canvas = document.getElementById('heroChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    // Sample data for the chart
    const data = [20, 45, 30, 60, 40, 70, 55, 80, 65, 90];
    const maxValue = Math.max(...data);
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Draw gradient background
    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, 'rgba(99, 102, 241, 0.3)');
    gradient.addColorStop(1, 'rgba(99, 102, 241, 0.05)');
    
    // Draw chart line
    ctx.beginPath();
    ctx.strokeStyle = '#6366f1';
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    
    data.forEach((value, index) => {
        const x = (index / (data.length - 1)) * width;
        const y = height - (value / maxValue) * height;
        
        if (index === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    });
    
    ctx.stroke();
    
    // Draw area under the line
    ctx.lineTo(width, height);
    ctx.lineTo(0, height);
    ctx.closePath();
    ctx.fillStyle = gradient;
    ctx.fill();
    
    // Draw data points
    ctx.fillStyle = '#6366f1';
    data.forEach((value, index) => {
        const x = (index / (data.length - 1)) * width;
        const y = height - (value / maxValue) * height;
        
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, 2 * Math.PI);
        ctx.fill();
        
        // Add white border
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, 2 * Math.PI);
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2;
        ctx.stroke();
    });
}

// ===== COUNTERS =====
function initializeCounters() {
    const counters = document.querySelectorAll('[data-count]');
    
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    counters.forEach(counter => {
        observer.observe(counter);
    });
}

function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-count'));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
        current += increment;
        
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        
        // Format number based on value
        let displayValue;
        if (target >= 1000) {
            displayValue = Math.floor(current).toLocaleString();
        } else if (target < 100 && target % 1 !== 0) {
            displayValue = current.toFixed(1);
        } else {
            displayValue = Math.floor(current);
        }
        
        element.textContent = displayValue;
    }, 16);
}

// ===== PRICING =====
function initializePricing() {
    if (!elements.pricingToggle) return;
    
    elements.pricingToggle.addEventListener('click', togglePricing);
    
    // Initialize pricing display
    updatePricingDisplay();
}

function togglePricing() {
    isAnnualPricing = !isAnnualPricing;
    elements.pricingToggle.classList.toggle('active', isAnnualPricing);
    
    // Update toggle labels
    const labels = document.querySelectorAll('.toggle-label');
    labels.forEach((label, index) => {
        if (index === 0) {
            label.classList.toggle('active', !isAnnualPricing);
        } else {
            label.classList.toggle('active', isAnnualPricing);
        }
    });
    
    updatePricingDisplay();
}

function updatePricingDisplay() {
    const priceElements = document.querySelectorAll('.amount');
    
    priceElements.forEach(element => {
        const monthlyPrice = parseInt(element.getAttribute('data-monthly'));
        const yearlyPrice = parseInt(element.getAttribute('data-yearly'));
        
        const targetPrice = isAnnualPricing ? yearlyPrice : monthlyPrice;
        
        // Animate price change
        animatePrice(element, targetPrice);
    });
}

function animatePrice(element, targetPrice) {
    const currentPrice = parseInt(element.textContent);
    const difference = targetPrice - currentPrice;
    const duration = 500;
    const steps = 20;
    const increment = difference / steps;
    let step = 0;
    
    const timer = setInterval(() => {
        step++;
        const newPrice = Math.round(currentPrice + (increment * step));
        element.textContent = newPrice;
        
        if (step >= steps) {
            element.textContent = targetPrice;
            clearInterval(timer);
        }
    }, duration / steps);
}

// ===== TESTIMONIALS =====
function initializeTestimonials() {
    if (!elements.testimonialTrack || !elements.testimonialDots) return;
    
    const prevBtn = document.getElementById('testimonialPrev');
    const nextBtn = document.getElementById('testimonialNext');
    
    if (prevBtn) prevBtn.addEventListener('click', () => changeTestimonial(-1));
    if (nextBtn) nextBtn.addEventListener('click', () => changeTestimonial(1));
    
    // Dot navigation
    const dots = elements.testimonialDots.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => goToTestimonial(index));
    });
    
    // Auto-play testimonials
    setInterval(() => {
        changeTestimonial(1);
    }, 5000);
    
    // Initialize first testimonial
    updateTestimonialDisplay();
}

function changeTestimonial(direction) {
    const testimonials = elements.testimonialTrack.querySelectorAll('.testimonial-card');
    const totalTestimonials = testimonials.length;
    
    currentTestimonial += direction;
    
    if (currentTestimonial >= totalTestimonials) {
        currentTestimonial = 0;
    } else if (currentTestimonial < 0) {
        currentTestimonial = totalTestimonials - 1;
    }
    
    updateTestimonialDisplay();
}

function goToTestimonial(index) {
    currentTestimonial = index;
    updateTestimonialDisplay();
}

function updateTestimonialDisplay() {
    const translateX = -currentTestimonial * 100;
    elements.testimonialTrack.style.transform = `translateX(${translateX}%)`;
    
    // Update dots
    const dots = elements.testimonialDots.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentTestimonial);
    });
    
    // Update testimonial cards
    const testimonials = elements.testimonialTrack.querySelectorAll('.testimonial-card');
    testimonials.forEach((testimonial, index) => {
        testimonial.classList.toggle('active', index === currentTestimonial);
    });
}

// ===== CONTACT FORM =====
function initializeContactForm() {
    if (!elements.contactForm) return;
    
    elements.contactForm.addEventListener('submit', handleContactSubmit);
    
    // Form validation
    const inputs = elements.contactForm.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        input.addEventListener('blur', validateField);
        input.addEventListener('input', clearFieldError);
    });
}

function handleContactSubmit(e) {
    e.preventDefault();
    
    const submitBtn = elements.contactForm.querySelector('.form-submit');
    const formData = new FormData(elements.contactForm);
    
    // Validate form
    if (!validateForm()) {
        showNotification('Por favor, completa todos los campos requeridos.', 'error');
        return;
    }
    
    // Show loading state
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;
    
    // Simulate form submission
    setTimeout(() => {
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
        
        // Show success message
        showNotification('¡Mensaje enviado exitosamente! Te contactaremos pronto.', 'success');
        
        // Reset form
        elements.contactForm.reset();
        
        // Clear any error states
        const errorFields = elements.contactForm.querySelectorAll('.error');
        errorFields.forEach(field => field.classList.remove('error'));
        
    }, 2000);
}

function validateForm() {
    const requiredFields = elements.contactForm.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            field.classList.add('error');
            isValid = false;
        } else {
            field.classList.remove('error');
        }
    });
    
    // Validate email
    const emailField = elements.contactForm.querySelector('input[type="email"]');
    if (emailField && emailField.value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailField.value)) {
            emailField.classList.add('error');
            isValid = false;
        }
    }
    
    return isValid;
}

function validateField(e) {
    const field = e.target;
    
    if (field.hasAttribute('required') && !field.value.trim()) {
        field.classList.add('error');
    } else if (field.type === 'email' && field.value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(field.value)) {
            field.classList.add('error');
        } else {
            field.classList.remove('error');
        }
    } else {
        field.classList.remove('error');
    }
}

function clearFieldError(e) {
    e.target.classList.remove('error');
}

// ===== MODALS =====
function initializeModals() {
    if (!elements.demoModal) return;
    
    const demoButtons = document.querySelectorAll('#heroSecondaryBtn, #navCtaBtn');
    const closeBtn = document.getElementById('modalClose');
    const scheduleDemoBtn = document.getElementById('scheduleDemoBtn');
    const startTrialBtn = document.getElementById('startTrialBtn');
    
    demoButtons.forEach(btn => {
        btn.addEventListener('click', () => openModal(elements.demoModal));
    });
    
    if (closeBtn) {
        closeBtn.addEventListener('click', () => closeModal(elements.demoModal));
    }
    
    if (scheduleDemoBtn) {
        scheduleDemoBtn.addEventListener('click', () => {
            showNotification('Redirigiendo al calendario de demos...', 'success');
            closeModal(elements.demoModal);
        });
    }
    
    if (startTrialBtn) {
        startTrialBtn.addEventListener('click', () => {
            showNotification('Redirigiendo al registro de prueba gratuita...', 'success');
            closeModal(elements.demoModal);
        });
    }
    
    // Close modal when clicking outside
    elements.demoModal.addEventListener('click', (e) => {
        if (e.target === elements.demoModal) {
            closeModal(elements.demoModal);
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && elements.demoModal.classList.contains('active')) {
            closeModal(elements.demoModal);
        }
    });
}

function openModal(modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal(modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

// ===== SCROLL EFFECTS =====
function initializeScrollEffects() {
    window.addEventListener('scroll', throttle(handleScroll, 16));
    
    // Initialize back to top button
    if (elements.backToTop) {
        elements.backToTop.addEventListener('click', scrollToTop);
    }
}

function handleScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Back to top button visibility
    if (elements.backToTop) {
        if (scrollTop > 500) {
            elements.backToTop.classList.add('visible');
        } else {
            elements.backToTop.classList.remove('visible');
        }
    }
    
    // Parallax effects
    handleParallax(scrollTop);
    
    lastScrollTop = scrollTop;
}

function handleParallax(scrollTop) {
    const heroParticles = document.querySelector('.hero-particles');
    if (heroParticles) {
        const speed = scrollTop * 0.5;
        heroParticles.style.transform = `translateY(${speed}px)`;
    }
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// ===== AOS INITIALIZATION =====
function initializeAOS() {
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            easing: 'ease-out-cubic',
            once: true,
            offset: 100,
            delay: 0
        });
    }
}

// ===== PARTICLES =====
function initializeParticles() {
    createFloatingParticles();
}

function createFloatingParticles() {
    const heroParticles = document.querySelector('.hero-particles');
    if (!heroParticles) return;
    
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'floating-particle';
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 4 + 2}px;
            height: ${Math.random() * 4 + 2}px;
            background: rgba(99, 102, 241, ${Math.random() * 0.5 + 0.2});
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: float ${Math.random() * 3 + 2}s ease-in-out infinite;
            animation-delay: ${Math.random() * 2}s;
        `;
        
        heroParticles.appendChild(particle);
    }
}

// ===== NOTIFICATION SYSTEM =====
function showNotification(message, type = 'success', duration = 5000) {
    if (!elements.notificationContainer) return;
    
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    
    const icon = getNotificationIcon(type);
    
    notification.innerHTML = `
        <div class="notification-icon">
            <i class="${icon}"></i>
        </div>
        <div class="notification-content">
            <div class="notification-title">${getNotificationTitle(type)}</div>
            <div class="notification-message">${message}</div>
        </div>
        <button class="notification-close">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    elements.notificationContainer.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Auto remove
    setTimeout(() => {
        removeNotification(notification);
    }, duration);
    
    // Manual close
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => removeNotification(notification));
}

function removeNotification(notification) {
    notification.classList.remove('show');
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 300);
}

function getNotificationIcon(type) {
    switch (type) {
        case 'success': return 'fas fa-check';
        case 'error': return 'fas fa-exclamation-triangle';
        case 'warning': return 'fas fa-exclamation';
        default: return 'fas fa-info';
    }
}

function getNotificationTitle(type) {
    switch (type) {
        case 'success': return 'Éxito';
        case 'error': return 'Error';
        case 'warning': return 'Advertencia';
        default: return 'Información';
    }
}

// ===== CTA BUTTONS =====
document.addEventListener('DOMContentLoaded', function() {
    const primaryCtaButtons = document.querySelectorAll('#heroPrimaryBtn, .pricing-cta');
    
    primaryCtaButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            showNotification('Redirigiendo al registro de prueba gratuita...', 'success');
            
            // Simulate redirect
            setTimeout(() => {
                // window.location.href = '/signup';
                console.log('Redirecting to signup page...');
            }, 1500);
        });
    });
});

// ===== UTILITY FUNCTIONS =====
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
    };
}

function debounce(func, wait, immediate) {
    let timeout;
    return function() {
        const context = this;
        const args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

function easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
}

// ===== PERFORMANCE OPTIMIZATION =====
// Lazy load images
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Preload critical resources
function preloadCriticalResources() {
    const criticalImages = [
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
        'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'
    ];
    
    criticalImages.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
    });
}

// Initialize performance optimizations
document.addEventListener('DOMContentLoaded', function() {
    initializeLazyLoading();
    preloadCriticalResources();
});

// ===== ERROR HANDLING =====
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
    // You could send this to an error tracking service
});

window.addEventListener('unhandledrejection', function(e) {
    console.error('Unhandled Promise Rejection:', e.reason);
    // You could send this to an error tracking service
});

// ===== ANALYTICS TRACKING =====
function trackEvent(eventName, eventData = {}) {
    // Google Analytics 4 tracking
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, eventData);
    }
    
    // Custom analytics tracking
    console.log('Event tracked:', eventName, eventData);
}

// Track important user interactions
document.addEventListener('DOMContentLoaded', function() {
    // Track CTA clicks
    const ctaButtons = document.querySelectorAll('.cta-primary, .cta-secondary, .pricing-cta');
    ctaButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            trackEvent('cta_click', {
                button_text: this.textContent.trim(),
                button_location: this.closest('section')?.id || 'unknown'
            });
        });
    });
    
    // Track form submissions
    if (elements.contactForm) {
        elements.contactForm.addEventListener('submit', function() {
            trackEvent('form_submit', {
                form_type: 'contact'
            });
        });
    }
    
    // Track scroll depth
    let maxScrollDepth = 0;
    window.addEventListener('scroll', throttle(function() {
        const scrollDepth = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
        if (scrollDepth > maxScrollDepth) {
            maxScrollDepth = scrollDepth;
            if (maxScrollDepth % 25 === 0) {
                trackEvent('scroll_depth', {
                    depth: maxScrollDepth
                });
            }
        }
    }, 1000));
});