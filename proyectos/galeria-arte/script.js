// Global variables
let currentHeroSlide = 0;
let heroSlides = [];
let featuredCarouselPosition = 0;
let galleryData = [];
let filteredGallery = [];
let currentView = 'grid';
let currentFilter = 'all';
let isLoading = false;
let lightbox;

// Sample gallery data
const sampleArtworks = [
    {
        id: 1,
        title: "Abstracción Moderna",
        artist: "María González",
        category: "abstract",
        technique: "Óleo sobre lienzo",
        dimensions: "120 x 90 cm",
        year: "2023",
        price: "$2,500",
        image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "Una exploración vibrante de formas abstractas que captura la esencia del movimiento contemporáneo."
    },
    {
        id: 2,
        title: "Expresión Urbana",
        artist: "Carlos Mendoza",
        category: "portrait",
        technique: "Acrílico y spray",
        dimensions: "100 x 70 cm",
        year: "2023",
        price: "$1,800",
        image: "https://images.unsplash.com/photo-1536924940846-227afb31e2a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "Un retrato que fusiona técnicas tradicionales con el arte urbano contemporáneo."
    },
    {
        id: 3,
        title: "Naturaleza Digital",
        artist: "Ana Ruiz",
        category: "digital",
        technique: "Arte digital",
        dimensions: "Impresión 80 x 60 cm",
        year: "2024",
        price: "$3,200",
        image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "Una interpretación digital de la naturaleza que desafía los límites entre lo real y lo virtual."
    },
    {
        id: 4,
        title: "Paisaje Onírico",
        artist: "Roberto Silva",
        category: "landscape",
        technique: "Acuarela",
        dimensions: "90 x 120 cm",
        year: "2023",
        price: "$2,100",
        image: "https://images.unsplash.com/photo-1578321272176-b7bbc0679853?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "Un paisaje que evoca sensaciones oníricas a través de colores suaves y formas fluidas."
    },
    {
        id: 5,
        title: "Escultura Contemporánea",
        artist: "Elena Fernández",
        category: "sculpture",
        technique: "Bronce y acero",
        dimensions: "150 x 80 x 60 cm",
        year: "2023",
        price: "$4,500",
        image: "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "Una escultura que explora la relación entre forma y espacio en el arte contemporáneo."
    },
    {
        id: 6,
        title: "Retrato Expresivo",
        artist: "Luis Martínez",
        category: "portrait",
        technique: "Óleo sobre lienzo",
        dimensions: "70 x 50 cm",
        year: "2024",
        price: "$1,900",
        image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "Un retrato que captura la intensidad emocional a través de pinceladas expresivas."
    }
];

// Initialize application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    showLoadingScreen();
    
    setTimeout(() => {
        hideLoadingScreen();
        initializeComponents();
        loadGalleryData();
        setupEventListeners();
        initializeAnimations();
    }, 2000);
}

// Loading screen functions
function showLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
        loadingScreen.style.display = 'flex';
    }
}

function hideLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
        loadingScreen.classList.add('hidden');
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }
}

// Initialize components
function initializeComponents() {
    initializeNavbar();
    initializeHeroSlider();
    initializeFeaturedCarousel();
    initializeSearch();
    initializeLightbox();
    initializeBackToTop();
    initializeCounters();
}

// Navbar functionality
function initializeNavbar() {
    const navbar = document.getElementById('mainNavbar');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    
    // Scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Update active nav item
                navLinks.forEach(nav => nav.classList.remove('active'));
                this.classList.add('active');
                
                // Close mobile menu
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse.classList.contains('show')) {
                    const navbarToggler = document.querySelector('.navbar-toggler');
                    navbarToggler.click();
                }
            }
        });
    });
    
    // Update active nav on scroll
    window.addEventListener('scroll', updateActiveNav);
}

function updateActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// Hero slider functionality
function initializeHeroSlider() {
    heroSlides = document.querySelectorAll('.hero-slide');
    const prevBtn = document.getElementById('heroPrev');
    const nextBtn = document.getElementById('heroNext');
    
    if (heroSlides.length > 0) {
        // Auto-play slider
        setInterval(nextHeroSlide, 5000);
        
        // Navigation buttons
        if (prevBtn) {
            prevBtn.addEventListener('click', prevHeroSlide);
        }
        if (nextBtn) {
            nextBtn.addEventListener('click', nextHeroSlide);
        }
    }
}

function nextHeroSlide() {
    heroSlides[currentHeroSlide].classList.remove('active');
    currentHeroSlide = (currentHeroSlide + 1) % heroSlides.length;
    heroSlides[currentHeroSlide].classList.add('active');
}

function prevHeroSlide() {
    heroSlides[currentHeroSlide].classList.remove('active');
    currentHeroSlide = currentHeroSlide === 0 ? heroSlides.length - 1 : currentHeroSlide - 1;
    heroSlides[currentHeroSlide].classList.add('active');
}

// Featured carousel functionality
function initializeFeaturedCarousel() {
    const track = document.getElementById('featuredTrack');
    const prevBtn = document.getElementById('featuredPrev');
    const nextBtn = document.getElementById('featuredNext');
    const items = document.querySelectorAll('.featured-item');
    
    if (track && items.length > 0) {
        const itemWidth = items[0].offsetWidth + 32; // Including gap
        const maxPosition = -(items.length - 1) * itemWidth;
        
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                if (featuredCarouselPosition < 0) {
                    featuredCarouselPosition += itemWidth;
                    updateFeaturedCarousel();
                }
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                if (featuredCarouselPosition > maxPosition) {
                    featuredCarouselPosition -= itemWidth;
                    updateFeaturedCarousel();
                }
            });
        }
    }
}

function updateFeaturedCarousel() {
    const track = document.getElementById('featuredTrack');
    if (track) {
        track.style.transform = `translateX(${featuredCarouselPosition}px)`;
    }
}

// Search functionality
function initializeSearch() {
    const searchBtn = document.getElementById('searchBtn');
    const searchOverlay = document.getElementById('searchOverlay');
    const searchClose = document.getElementById('searchClose');
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');
    
    if (searchBtn) {
        searchBtn.addEventListener('click', () => {
            searchOverlay.classList.add('active');
            setTimeout(() => searchInput.focus(), 300);
        });
    }
    
    if (searchClose) {
        searchClose.addEventListener('click', () => {
            searchOverlay.classList.remove('active');
            searchInput.value = '';
            searchResults.style.display = 'none';
        });
    }
    
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const query = this.value.toLowerCase().trim();
            if (query.length > 2) {
                performSearch(query);
            } else {
                searchResults.style.display = 'none';
            }
        });
    }
    
    // Close search on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && searchOverlay.classList.contains('active')) {
            searchOverlay.classList.remove('active');
        }
    });
}

function performSearch(query) {
    const results = sampleArtworks.filter(artwork => 
        artwork.title.toLowerCase().includes(query) ||
        artwork.artist.toLowerCase().includes(query) ||
        artwork.category.toLowerCase().includes(query)
    );
    
    displaySearchResults(results);
}

function displaySearchResults(results) {
    const searchResults = document.getElementById('searchResults');
    
    if (results.length === 0) {
        searchResults.innerHTML = '<div class="p-3 text-center text-muted">No se encontraron resultados</div>';
    } else {
        searchResults.innerHTML = results.map(artwork => `
            <div class="search-result-item p-3 border-bottom" data-artwork-id="${artwork.id}">
                <div class="d-flex align-items-center">
                    <img src="${artwork.image}" alt="${artwork.title}" class="search-result-image me-3" style="width: 60px; height: 60px; object-fit: cover; border-radius: 8px;">
                    <div>
                        <h6 class="mb-1">${artwork.title}</h6>
                        <p class="mb-0 text-muted small">${artwork.artist} - ${artwork.price}</p>
                    </div>
                </div>
            </div>
        `).join('');
        
        // Add click handlers to search results
        searchResults.querySelectorAll('.search-result-item').forEach(item => {
            item.addEventListener('click', function() {
                const artworkId = parseInt(this.getAttribute('data-artwork-id'));
                const artwork = sampleArtworks.find(a => a.id === artworkId);
                if (artwork) {
                    showArtworkModal(artwork);
                    document.getElementById('searchOverlay').classList.remove('active');
                }
            });
        });
    }
    
    searchResults.style.display = 'block';
}

// Lightbox functionality
function initializeLightbox() {
    if (typeof GLightbox !== 'undefined') {
        lightbox = GLightbox({
            selector: '.glightbox',
            touchNavigation: true,
            loop: true,
            autoplayVideos: true
        });
    }
}

// Back to top functionality
function initializeBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    
    if (backToTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });
        
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// Counter animations
function initializeCounters() {
    const counters = document.querySelectorAll('[data-count]');
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
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
    const step = target / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current);
    }, 16);
}

// Gallery functionality
function loadGalleryData() {
    galleryData = [...sampleArtworks];
    filteredGallery = [...galleryData];
    renderGallery();
}

function renderGallery() {
    const galleryGrid = document.getElementById('galleryGrid');
    if (!galleryGrid) return;
    
    galleryGrid.innerHTML = filteredGallery.map(artwork => `
        <div class="artwork-card" data-category="${artwork.category}" data-aos="fade-up">
            <div class="artwork-image">
                <img src="${artwork.image}" alt="${artwork.title}" class="glightbox" data-gallery="gallery">
                <div class="artwork-overlay">
                    <button class="btn btn-light btn-sm view-btn" onclick="showArtworkModal(${JSON.stringify(artwork).replace(/"/g, '&quot;')})">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="btn btn-light btn-sm like-btn" onclick="toggleLike(${artwork.id})">
                        <i class="far fa-heart"></i>
                    </button>
                </div>
            </div>
            <div class="artwork-info">
                <h4>${artwork.title}</h4>
                <p class="artist-name">${artwork.artist}</p>
                <p class="artwork-price">${artwork.price}</p>
            </div>
        </div>
    `).join('');
    
    // Reinitialize AOS for new elements
    if (typeof AOS !== 'undefined') {
        AOS.refresh();
    }
    
    // Reinitialize lightbox
    if (lightbox) {
        lightbox.destroy();
        initializeLightbox();
    }
}

// Gallery filters
function setupEventListeners() {
    // Filter buttons
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            setActiveFilter(this, filter);
            filterGallery(filter);
        });
    });
    
    // View controls
    const viewBtns = document.querySelectorAll('.view-btn');
    viewBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const view = this.getAttribute('data-view');
            setActiveView(this, view);
            changeGalleryView(view);
        });
    });
    
    // Load more button
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', loadMoreArtworks);
    }
    
    // Virtual tour button
    const virtualTourBtn = document.getElementById('virtualTourBtn');
    if (virtualTourBtn) {
        virtualTourBtn.addEventListener('click', function() {
            showNotification('¡Tour virtual próximamente disponible!', 'info');
        });
    }
    
    // Contact form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactForm);
    }
    
    // Newsletter form
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', handleNewsletterForm);
    }
    
    // Like buttons in featured section
    const likeBtns = document.querySelectorAll('.like-btn');
    likeBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const artworkId = parseInt(this.getAttribute('data-artwork'));
            toggleLike(artworkId);
        });
    });
    
    // View buttons in featured section
    const viewBtns2 = document.querySelectorAll('.view-btn');
    viewBtns2.forEach(btn => {
        btn.addEventListener('click', function() {
            const artworkId = parseInt(this.getAttribute('data-artwork'));
            const artwork = sampleArtworks.find(a => a.id === artworkId);
            if (artwork) {
                showArtworkModal(artwork);
            }
        });
    });
}

function setActiveFilter(button, filter) {
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
    currentFilter = filter;
}

function filterGallery(filter) {
    if (filter === 'all') {
        filteredGallery = [...galleryData];
    } else {
        filteredGallery = galleryData.filter(artwork => artwork.category === filter);
    }
    renderGallery();
}

function setActiveView(button, view) {
    document.querySelectorAll('.view-btn').forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
    currentView = view;
}

function changeGalleryView(view) {
    const galleryGrid = document.getElementById('galleryGrid');
    if (!galleryGrid) return;
    
    galleryGrid.className = `gallery-grid ${view}`;
}

function loadMoreArtworks() {
    if (isLoading) return;
    
    isLoading = true;
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    
    if (loadMoreBtn) {
        loadMoreBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Cargando...';
        
        // Simulate loading delay
        setTimeout(() => {
            // Add more sample artworks (in a real app, this would fetch from API)
            const moreArtworks = [
                {
                    id: galleryData.length + 1,
                    title: "Nueva Obra",
                    artist: "Artista Emergente",
                    category: "abstract",
                    technique: "Técnica mixta",
                    dimensions: "80 x 60 cm",
                    year: "2024",
                    price: "$1,500",
                    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                    description: "Una nueva exploración artística."
                }
            ];
            
            galleryData.push(...moreArtworks);
            filterGallery(currentFilter);
            
            loadMoreBtn.innerHTML = '<i class="fas fa-plus me-2"></i>Cargar Más Obras';
            isLoading = false;
            
            showNotification('Nuevas obras cargadas exitosamente', 'success');
        }, 1500);
    }
}

// Like functionality
function toggleLike(artworkId) {
    const likeBtn = document.querySelector(`[data-artwork="${artworkId}"] .like-btn i`);
    if (likeBtn) {
        if (likeBtn.classList.contains('far')) {
            likeBtn.classList.remove('far');
            likeBtn.classList.add('fas');
            likeBtn.style.color = '#e74c3c';
            showNotification('Obra agregada a favoritos', 'success');
        } else {
            likeBtn.classList.remove('fas');
            likeBtn.classList.add('far');
            likeBtn.style.color = '';
            showNotification('Obra removida de favoritos', 'info');
        }
    }
}

// Artwork modal
function showArtworkModal(artwork) {
    const modal = document.getElementById('artworkModal');
    if (!modal) return;
    
    // Update modal content
    document.getElementById('artworkModalTitle').textContent = artwork.title;
    document.getElementById('artworkModalImage').src = artwork.image;
    document.getElementById('artworkModalImage').alt = artwork.title;
    document.getElementById('artworkModalArtist').textContent = artwork.artist;
    document.getElementById('artworkModalTechnique').textContent = artwork.technique;
    document.getElementById('artworkModalDimensions').textContent = artwork.dimensions;
    document.getElementById('artworkModalYear').textContent = artwork.year;
    document.getElementById('artworkModalPrice').textContent = artwork.price;
    
    // Show modal
    const bootstrapModal = new bootstrap.Modal(modal);
    bootstrapModal.show();
}

// Form handlers
function handleContactForm(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const submitBtn = e.target.querySelector('button[type="submit"]');
    
    // Show loading state
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Enviando...';
    submitBtn.disabled = true;
    
    // Simulate form submission
    setTimeout(() => {
        showNotification('Mensaje enviado exitosamente. Te contactaremos pronto.', 'success');
        e.target.reset();
        
        // Reset button
        submitBtn.innerHTML = '<i class="fas fa-paper-plane me-2"></i>Enviar Mensaje';
        submitBtn.disabled = false;
    }, 2000);
}

function handleNewsletterForm(e) {
    e.preventDefault();
    
    const email = e.target.querySelector('input[type="email"]').value;
    const submitBtn = e.target.querySelector('button[type="submit"]');
    
    // Show loading state
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
    submitBtn.disabled = true;
    
    // Simulate subscription
    setTimeout(() => {
        showNotification('¡Suscripción exitosa! Gracias por unirte a nuestro newsletter.', 'success');
        e.target.reset();
        
        // Reset button
        submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i>';
        submitBtn.disabled = false;
    }, 1500);
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
    notification.style.cssText = `
        top: 20px;
        right: 20px;
        z-index: 9999;
        min-width: 300px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.1);
        border-radius: 12px;
    `;
    
    const icons = {
        success: 'fas fa-check-circle',
        error: 'fas fa-exclamation-circle',
        warning: 'fas fa-exclamation-triangle',
        info: 'fas fa-info-circle'
    };
    
    notification.innerHTML = `
        <div class="d-flex align-items-center">
            <i class="${icons[type]} me-2"></i>
            <span>${message}</span>
        </div>
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

// Initialize animations
function initializeAnimations() {
    // Initialize AOS (Animate On Scroll)
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-out-cubic',
            once: true,
            offset: 100
        });
    }
    
    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.hero-background');
        
        parallaxElements.forEach(element => {
            const speed = 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
    
    // Floating animation for hero stats
    const heroStats = document.querySelector('.hero-stats');
    if (heroStats) {
        let floatDirection = 1;
        setInterval(() => {
            const currentTransform = heroStats.style.transform || 'translateY(0px)';
            const currentY = parseFloat(currentTransform.match(/translateY\(([^)]+)px\)/) ? 
                currentTransform.match(/translateY\(([^)]+)px\)/)[1] : 0);
            
            if (currentY >= 10) floatDirection = -1;
            if (currentY <= -10) floatDirection = 1;
            
            heroStats.style.transform = `translateY(${currentY + (floatDirection * 0.5)}px)`;
        }, 50);
    }
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

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

// Responsive handling
window.addEventListener('resize', debounce(function() {
    // Recalculate carousel positions
    featuredCarouselPosition = 0;
    updateFeaturedCarousel();
    
    // Refresh AOS
    if (typeof AOS !== 'undefined') {
        AOS.refresh();
    }
}, 250));

// Keyboard navigation
document.addEventListener('keydown', function(e) {
    // Hero slider navigation
    if (e.key === 'ArrowLeft' && !document.querySelector('.modal.show')) {
        prevHeroSlide();
    } else if (e.key === 'ArrowRight' && !document.querySelector('.modal.show')) {
        nextHeroSlide();
    }
});

// Touch/swipe support for mobile
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
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // Swipe left - next slide
            nextHeroSlide();
        } else {
            // Swipe right - previous slide
            prevHeroSlide();
        }
    }
}

// Performance optimization
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading
document.addEventListener('DOMContentLoaded', lazyLoadImages);

// Error handling
window.addEventListener('error', function(e) {
    console.error('Error occurred:', e.error);
    showNotification('Ha ocurrido un error. Por favor, recarga la página.', 'error');
});

// Service worker registration (for PWA capabilities)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('ServiceWorker registration successful');
            })
            .catch(function(err) {
                console.log('ServiceWorker registration failed');
            });
    });
}

// Export functions for global access
window.showArtworkModal = showArtworkModal;
window.toggleLike = toggleLike;
window.showNotification = showNotification;

// Console welcome message
console.log('%c🎨 Galería de Arte Moderna', 'color: #667eea; font-size: 24px; font-weight: bold;');
console.log('%cBienvenido a nuestra galería digital interactiva', 'color: #764ba2; font-size: 14px;');
console.log('%cDesarrollado con ❤️ para amantes del arte', 'color: #f093fb; font-size: 12px;');