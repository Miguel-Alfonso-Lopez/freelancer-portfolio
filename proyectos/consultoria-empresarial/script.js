// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.15)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
    }
});

// Intersection Observer for animations
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

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.service-card, .case-study, .team-member, .feature-item');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
});

// Counter animation for hero stats
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            if (target >= 100) {
                element.textContent = Math.floor(start) + '+';
            } else {
                element.textContent = Math.floor(start) + '%';
            }
            requestAnimationFrame(updateCounter);
        } else {
            if (target >= 100) {
                element.textContent = target + '+';
            } else {
                element.textContent = target + '%';
            }
        }
    }
    
    updateCounter();
}

// Animate hero stats when they come into view
const statsObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat h3');
            statNumbers.forEach(stat => {
                const targetValue = parseInt(stat.textContent);
                animateCounter(stat, targetValue);
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.addEventListener('DOMContentLoaded', function() {
    const heroStats = document.querySelector('.hero-stats');
    if (heroStats) {
        statsObserver.observe(heroStats);
    }
});

// Service card hover effects
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
        this.querySelector('.service-icon').style.transform = 'scale(1.1) rotate(5deg)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
        this.querySelector('.service-icon').style.transform = 'scale(1) rotate(0deg)';
    });
});

// Contact form handling with advanced validation
document.querySelector('.contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form elements
    const name = this.querySelector('input[type="text"]').value.trim();
    const email = this.querySelector('input[type="email"]').value.trim();
    const phone = this.querySelector('input[type="tel"]').value.trim();
    const company = this.querySelector('select').value;
    const message = this.querySelector('textarea').value.trim();
    
    // Validation
    const errors = [];
    
    if (!name || name.length < 2) {
        errors.push('El nombre debe tener al menos 2 caracteres');
    }
    
    if (!email || !isValidEmail(email)) {
        errors.push('Por favor, ingresa un email válido');
    }
    
    if (!phone || !isValidPhone(phone)) {
        errors.push('Por favor, ingresa un teléfono válido');
    }
    
    if (!company) {
        errors.push('Por favor, selecciona el tipo de empresa');
    }
    
    if (!message || message.length < 10) {
        errors.push('El mensaje debe tener al menos 10 caracteres');
    }
    
    if (errors.length > 0) {
        showNotification(errors.join('<br>'), 'error');
        return;
    }
    
    // Simulate form submission with loading
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Enviando...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        showNotification('¡Excelente! Hemos recibido tu solicitud. Nos pondremos en contacto contigo en las próximas 24 horas.', 'success');
        this.reset();
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }, 2000);
});

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Phone validation
function isValidPhone(phone) {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
}

// Enhanced notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <div class="notification-icon">
                <i class="fas ${getNotificationIcon(type)}"></i>
            </div>
            <div class="notification-text">
                <div class="notification-title">${getNotificationTitle(type)}</div>
                <div class="notification-message">${message}</div>
            </div>
            <button class="notification-close">
                <i class="fas fa-times"></i>
            </button>
        </div>
        <div class="notification-progress"></div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 9999;
        background: white;
        border-left: 4px solid ${getNotificationColor(type)};
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        transform: translateX(400px);
        transition: all 0.3s ease;
        max-width: 400px;
        overflow: hidden;
    `;
    
    // Style notification content
    const content = notification.querySelector('.notification-content');
    content.style.cssText = `
        display: flex;
        align-items: flex-start;
        padding: 20px;
        gap: 15px;
    `;
    
    const icon = notification.querySelector('.notification-icon');
    icon.style.cssText = `
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: ${getNotificationColor(type)};
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: 18px;
        flex-shrink: 0;
    `;
    
    const text = notification.querySelector('.notification-text');
    text.style.cssText = `
        flex: 1;
    `;
    
    const title = notification.querySelector('.notification-title');
    title.style.cssText = `
        font-weight: 600;
        color: #1e293b;
        margin-bottom: 5px;
        font-size: 14px;
    `;
    
    const messageEl = notification.querySelector('.notification-message');
    messageEl.style.cssText = `
        color: #64748b;
        font-size: 13px;
        line-height: 1.4;
    `;
    
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.style.cssText = `
        background: none;
        border: none;
        color: #94a3b8;
        cursor: pointer;
        padding: 5px;
        border-radius: 5px;
        transition: all 0.2s ease;
        flex-shrink: 0;
    `;
    
    const progress = notification.querySelector('.notification-progress');
    progress.style.cssText = `
        height: 3px;
        background: ${getNotificationColor(type)};
        width: 100%;
        transform-origin: left;
        animation: notificationProgress 5s linear;
    `;
    
    // Add progress animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes notificationProgress {
            from { transform: scaleX(1); }
            to { transform: scaleX(0); }
        }
    `;
    document.head.appendChild(style);
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        removeNotification(notification);
    }, 5000);
    
    // Close button functionality
    closeBtn.addEventListener('click', () => {
        removeNotification(notification);
    });
    
    // Hover to pause auto-remove
    let autoRemoveTimeout;
    notification.addEventListener('mouseenter', () => {
        progress.style.animationPlayState = 'paused';
    });
    
    notification.addEventListener('mouseleave', () => {
        progress.style.animationPlayState = 'running';
    });
}

function removeNotification(notification) {
    notification.style.transform = 'translateX(400px)';
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 300);
}

function getNotificationIcon(type) {
    const icons = {
        success: 'fa-check',
        error: 'fa-exclamation-triangle',
        warning: 'fa-exclamation',
        info: 'fa-info'
    };
    return icons[type] || icons.info;
}

function getNotificationTitle(type) {
    const titles = {
        success: '¡Éxito!',
        error: 'Error',
        warning: 'Advertencia',
        info: 'Información'
    };
    return titles[type] || titles.info;
}

function getNotificationColor(type) {
    const colors = {
        success: '#10b981',
        error: '#ef4444',
        warning: '#f59e0b',
        info: '#3b82f6'
    };
    return colors[type] || colors.info;
}

// Parallax effect for floating cards
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const cards = document.querySelectorAll('.floating-card');
    
    cards.forEach((card, index) => {
        const speed = 0.5 + (index * 0.1);
        card.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Add loading animation
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Mobile menu improvements
document.addEventListener('DOMContentLoaded', function() {
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            if (navbarCollapse.classList.contains('show')) {
                navbarToggler.click();
            }
        });
    });
});

// Enhanced button interactions
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px)';
    });
    
    btn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
    
    btn.addEventListener('mousedown', function() {
        this.style.transform = 'translateY(0) scale(0.98)';
    });
    
    btn.addEventListener('mouseup', function() {
        this.style.transform = 'translateY(-2px) scale(1)';
    });
});

// Case study hover effects
document.querySelectorAll('.case-study').forEach(caseStudy => {
    caseStudy.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
        this.querySelector('.case-icon').style.transform = 'scale(1.2) rotate(10deg)';
    });
    
    caseStudy.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
        this.querySelector('.case-icon').style.transform = 'scale(1) rotate(0deg)';
    });
});

// Team member interactions
document.querySelectorAll('.team-member').forEach(member => {
    member.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px) scale(1.05)';
        this.querySelector('.member-avatar').style.transform = 'scale(1.1)';
    });
    
    member.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
        this.querySelector('.member-avatar').style.transform = 'scale(1)';
    });
});