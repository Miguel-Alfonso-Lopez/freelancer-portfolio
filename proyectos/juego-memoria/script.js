// Global variables
let gameBoard = document.getElementById('gameBoard');
let timeValue = document.getElementById('timeValue');
let movesValue = document.getElementById('movesValue');
let scoreValue = document.getElementById('scoreValue');
let difficultySelect = document.getElementById('difficultySelect');

let cards = [];
let flippedCards = [];
let matchedCards = [];
let gameStarted = false;
let gamePaused = false;
let gameTimer;
let seconds = 0;
let minutes = 0;
let moves = 0;
let score = 0;
let currentDifficulty = 'medium';
let hintsRemaining = 3;
let isAnimating = false;

// Card symbols for different difficulties
const cardSymbols = {
    easy: ['fa-star', 'fa-heart', 'fa-diamond', 'fa-crown', 'fa-bolt', 'fa-moon'],
    medium: ['fa-star', 'fa-heart', 'fa-diamond', 'fa-crown', 'fa-bolt', 'fa-moon', 'fa-sun', 'fa-tree'],
    hard: ['fa-star', 'fa-heart', 'fa-diamond', 'fa-crown', 'fa-bolt', 'fa-moon', 'fa-sun', 'fa-tree', 'fa-car', 'fa-house', 'fa-gift', 'fa-fire'],
    expert: ['fa-star', 'fa-heart', 'fa-diamond', 'fa-crown', 'fa-bolt', 'fa-moon', 'fa-sun', 'fa-tree', 'fa-car', 'fa-house', 'fa-gift', 'fa-fire', 'fa-plane', 'fa-rocket', 'fa-gamepad', 'fa-music', 'fa-camera', 'fa-book']
};

// Board configurations
const boardConfig = {
    easy: { cols: 4, rows: 3 },
    medium: { cols: 4, rows: 4 },
    hard: { cols: 6, rows: 4 },
    expert: { cols: 6, rows: 6 }
};

// Sample leaderboard data
const leaderboardData = [
    { position: 1, name: "Laura García", level: "Experto", time: "01:45", score: 3200 },
    { position: 2, name: "Carlos Rodríguez", level: "Difícil", time: "02:10", score: 2800 },
    { position: 3, name: "Ana Martínez", level: "Experto", time: "02:30", score: 2600 },
    { position: 4, name: "Miguel López", level: "Medio", time: "01:55", score: 2400 },
    { position: 5, name: "Elena Sánchez", level: "Difícil", time: "02:45", score: 2200 },
    { position: 6, name: "Javier Fernández", level: "Medio", time: "03:10", score: 2000 },
    { position: 7, name: "Sofía Díaz", level: "Fácil", time: "02:20", score: 1800 },
    { position: 8, name: "Pablo Ruiz", level: "Medio", time: "03:30", score: 1600 },
    { position: 9, name: "Lucía Gómez", level: "Fácil", time: "03:45", score: 1400 },
    { position: 10, name: "Daniel Torres", level: "Medio", time: "04:00", score: 1200 }
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
        setupEventListeners();
        initializeAnimations();
        populateLeaderboard();
        startNewGame();
    }, 2000);
}

// Loading screen functions
function showLoadingScreen() {
    const loadingScreen = document.getElementById('loadingScreen');
    if (loadingScreen) {
        loadingScreen.style.display = 'flex';
    }
}

function hideLoadingScreen() {
    const loadingScreen = document.getElementById('loadingScreen');
    if (loadingScreen) {
        loadingScreen.classList.add('hidden');
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }
}

// Initialize components
function initializeComponents() {
    gameBoard = document.getElementById('gameBoard');
    timeValue = document.getElementById('timeValue');
    movesValue = document.getElementById('movesValue');
    scoreValue = document.getElementById('scoreValue');
    difficultySelect = document.getElementById('difficultySelect');
    
    initializeNavbar();
    initializeBackToTop();
    initializeCounters();
    initializeThemeToggle();
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

// Theme toggle functionality
function initializeThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const htmlElement = document.documentElement;
    
    // Check for saved theme preference or use default
    const savedTheme = localStorage.getItem('theme') || 'light';
    htmlElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
    
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            const currentTheme = htmlElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            
            htmlElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeIcon(newTheme);
            
            showNotification(`Tema ${newTheme === 'dark' ? 'oscuro' : 'claro'} activado`, 'info');
        });
    }
}

function updateThemeIcon(theme) {
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        const icon = themeToggle.querySelector('i');
        if (theme === 'dark') {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    }
}

// Setup event listeners
function setupEventListeners() {
    // Game controls
    const newGameBtn = document.getElementById('newGameBtn');
    const pauseBtn = document.getElementById('pauseBtn');
    const hintBtn = document.getElementById('hintBtn');
    const resumeBtn = document.getElementById('resumeBtn');
    const playNowBtn = document.getElementById('playNowBtn');
    const startGameBtn = document.getElementById('startGameBtn');
    const watchDemoBtn = document.getElementById('watchDemoBtn');
    
    if (difficultySelect) {
        difficultySelect.addEventListener('change', function() {
            currentDifficulty = this.value;
            startNewGame();
        });
    }
    
    if (newGameBtn) {
        newGameBtn.addEventListener('click', startNewGame);
    }
    
    if (pauseBtn) {
        pauseBtn.addEventListener('click', togglePause);
    }
    
    if (hintBtn) {
        hintBtn.addEventListener('click', showHint);
    }
    
    if (resumeBtn) {
        resumeBtn.addEventListener('click', togglePause);
    }
    
    if (playNowBtn) {
        playNowBtn.addEventListener('click', function() {
            document.querySelector('#game').scrollIntoView({ behavior: 'smooth' });
        });
    }
    
    if (startGameBtn) {
        startGameBtn.addEventListener('click', function() {
            document.querySelector('#game').scrollIntoView({ behavior: 'smooth' });
        });
    }
    
    if (watchDemoBtn) {
        watchDemoBtn.addEventListener('click', function() {
            showNotification('Demo próximamente disponible', 'info');
        });
    }
    
    // Victory modal buttons
    const playAgainBtn = document.getElementById('playAgainBtn');
    const shareScoreBtn = document.getElementById('shareScoreBtn');
    
    if (playAgainBtn) {
        playAgainBtn.addEventListener('click', function() {
            const victoryModal = bootstrap.Modal.getInstance(document.getElementById('victoryModal'));
            if (victoryModal) {
                victoryModal.hide();
            }
            startNewGame();
        });
    }
    
    if (shareScoreBtn) {
        shareScoreBtn.addEventListener('click', function() {
            shareScore();
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
}

// Game functions
function startNewGame() {
    // Reset game state
    resetGameState();
    
    // Create game board
    createGameBoard();
    
    // Start timer
    startTimer();
    
    // Show game board
    gameBoard.style.opacity = '1';
    gameBoard.style.pointerEvents = 'auto';
    
    // Hide overlay
    const gameOverlay = document.getElementById('gameOverlay');
    if (gameOverlay) {
        gameOverlay.classList.remove('active');
    }
    
    gameStarted = true;
    gamePaused = false;
    
    showNotification(`Nuevo juego iniciado - Dificultad: ${getDifficultyName(currentDifficulty)}`, 'success');
}

function resetGameState() {
    // Clear previous game
    if (gameBoard) {
        gameBoard.innerHTML = '';
    }
    
    // Reset variables
    cards = [];
    flippedCards = [];
    matchedCards = [];
    seconds = 0;
    minutes = 0;
    moves = 0;
    score = 0;
    hintsRemaining = 3;
    
    // Reset UI
    if (timeValue) timeValue.textContent = '00:00';
    if (movesValue) movesValue.textContent = '0';
    if (scoreValue) scoreValue.textContent = '0';
    
    // Clear timer
    if (gameTimer) {
        clearInterval(gameTimer);
        gameTimer = null;
    }
}

function createGameBoard() {
    const config = boardConfig[currentDifficulty];
    const symbols = cardSymbols[currentDifficulty];
    const totalPairs = (config.cols * config.rows) / 2;
    
    // Set board class
    gameBoard.className = `game-board ${currentDifficulty}`;
    
    // Select random symbols for this game
    const gameSymbols = [];
    const shuffledSymbols = [...symbols].sort(() => Math.random() - 0.5);
    
    for (let i = 0; i < totalPairs; i++) {
        gameSymbols.push(shuffledSymbols[i % shuffledSymbols.length]);
    }
    
    // Double the symbols and shuffle
    const doubledSymbols = [...gameSymbols, ...gameSymbols];
    const shuffledCards = doubledSymbols.sort(() => Math.random() - 0.5);
    
    // Create cards
    for (let i = 0; i < shuffledCards.length; i++) {
        const card = document.createElement('div');
        card.className = 'game-card';
        card.dataset.symbol = shuffledCards[i];
        card.dataset.index = i;
        
        // Card front (hidden symbol)
        const cardFront = document.createElement('i');
        cardFront.className = `fas ${shuffledCards[i]}`;
        cardFront.style.opacity = '0';
        card.appendChild(cardFront);
        
        // Add click event
        card.addEventListener('click', flipCard);
        
        // Add to board
        gameBoard.appendChild(card);
        cards.push(card);
    }
}

function flipCard() {
    // Prevent flipping if game is not started, paused, or card is already flipped/matched
    if (!gameStarted || gamePaused || isAnimating || 
        flippedCards.length >= 2 || 
        this.classList.contains('flipped') || 
        this.classList.contains('matched')) {
        return;
    }
    
    // Flip the card
    this.classList.add('flipped');
    const cardIcon = this.querySelector('i');
    if (cardIcon) {
        cardIcon.style.opacity = '1';
    }
    
    // Add to flipped cards
    flippedCards.push(this);
    
    // Check for match if two cards are flipped
    if (flippedCards.length === 2) {
        // Increment moves
        moves++;
        updateMovesDisplay();
        
        // Check for match
        checkForMatch();
    }
}

function checkForMatch() {
    const card1 = flippedCards[0];
    const card2 = flippedCards[1];
    
    if (card1.dataset.symbol === card2.dataset.symbol) {
        // Match found
        matchCards();
    } else {
        // No match
        unflipCards();
    }
}

function matchCards() {
    isAnimating = true;
    
    // Add matched class
    flippedCards.forEach(card => {
        card.classList.add('matched');
        card.classList.remove('flipped');
        card.removeEventListener('click', flipCard);
    });
    
    // Add to matched cards
    matchedCards.push(...flippedCards);
    
    // Update score
    updateScore(true);
    
    // Clear flipped cards
    flippedCards = [];
    
    // Check for game completion
    setTimeout(() => {
        isAnimating = false;
        if (matchedCards.length === cards.length) {
            gameComplete();
        }
    }, 600);
}

function unflipCards() {
    isAnimating = true;
    
    // Add wrong class briefly
    flippedCards.forEach(card => {
        card.classList.add('wrong');
    });
    
    // Update score
    updateScore(false);
    
    // Unflip after delay
    setTimeout(() => {
        flippedCards.forEach(card => {
            card.classList.remove('flipped');
            card.classList.remove('wrong');
            const cardIcon = card.querySelector('i');
            if (cardIcon) {
                cardIcon.style.opacity = '0';
            }
        });
        
        flippedCards = [];
        isAnimating = false;
    }, 1000);
}

function updateScore(isMatch) {
    // Base points
    const basePoints = isMatch ? 100 : -10;
    
    // Difficulty multiplier
    const difficultyMultiplier = {
        easy: 1,
        medium: 1.5,
        hard: 2,
        expert: 3
    };
    
    // Time bonus (faster = more points)
    const timeElapsed = minutes * 60 + seconds;
    const timeBonus = isMatch ? Math.max(0, 30 - Math.floor(timeElapsed / 10)) : 0;
    
    // Calculate points
    const points = Math.round(basePoints * difficultyMultiplier[currentDifficulty] + timeBonus);
    
    // Update score
    score += points;
    score = Math.max(0, score); // Prevent negative score
    
    // Update display
    if (scoreValue) {
        scoreValue.textContent = score;
    }
    
    // Show points animation
    if (isMatch) {
        showPointsAnimation(points, true);
    } else if (points < 0) {
        showPointsAnimation(points, false);
    }
}

function showPointsAnimation(points, isPositive) {
    const pointsElement = document.createElement('div');
    pointsElement.className = `points-animation ${isPositive ? 'positive' : 'negative'}`;
    pointsElement.textContent = isPositive ? `+${points}` : points;
    
    document.body.appendChild(pointsElement);
    
    // Position near score display
    const scoreRect = scoreValue.getBoundingClientRect();
    pointsElement.style.top = `${scoreRect.top - 30}px`;
    pointsElement.style.left = `${scoreRect.left + scoreRect.width / 2}px`;
    
    // Animate and remove
    setTimeout(() => {
        pointsElement.style.opacity = '0';
        pointsElement.style.transform = `translateY(${isPositive ? '-20px' : '20px'})`;
        
        setTimeout(() => {
            if (pointsElement.parentNode) {
                pointsElement.parentNode.removeChild(pointsElement);
            }
        }, 500);
    }, 50);
}

function updateMovesDisplay() {
    if (movesValue) {
        movesValue.textContent = moves;
    }
}

function startTimer() {
    if (gameTimer) {
        clearInterval(gameTimer);
    }
    
    gameTimer = setInterval(() => {
        if (!gamePaused) {
            seconds++;
            if (seconds >= 60) {
                seconds = 0;
                minutes++;
            }
            
            updateTimerDisplay();
        }
    }, 1000);
}

function updateTimerDisplay() {
    if (timeValue) {
        const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
        const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
        timeValue.textContent = `${formattedMinutes}:${formattedSeconds}`;
    }
}

function togglePause() {
    if (!gameStarted) return;
    
    gamePaused = !gamePaused;
    const gameOverlay = document.getElementById('gameOverlay');
    const pauseBtn = document.getElementById('pauseBtn');
    
    if (gamePaused) {
        // Pause game
        if (gameOverlay) {
            gameOverlay.classList.add('active');
        }
        if (pauseBtn) {
            pauseBtn.innerHTML = '<i class="fas fa-play"></i>';
        }
    } else {
        // Resume game
        if (gameOverlay) {
            gameOverlay.classList.remove('active');
        }
        if (pauseBtn) {
            pauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
        }
    }
}

function showHint() {
    if (!gameStarted || gamePaused || hintsRemaining <= 0) {
        if (hintsRemaining <= 0) {
            showNotification('No quedan pistas disponibles', 'warning');
        }
        return;
    }
    
    // Find unmatched cards
    const unmatchedCards = cards.filter(card => !card.classList.contains('matched'));
    
    if (unmatchedCards.length <= 0) return;
    
    // Get a random symbol from unmatched cards
    const randomIndex = Math.floor(Math.random() * unmatchedCards.length);
    const randomSymbol = unmatchedCards[randomIndex].dataset.symbol;
    
    // Find all cards with this symbol
    const hintCards = unmatchedCards.filter(card => card.dataset.symbol === randomSymbol);
    
    // Show hint animation
    hintCards.forEach(card => {
        card.classList.add('hint');
        setTimeout(() => {
            card.classList.remove('hint');
        }, 1000);
    });
    
    // Decrease hints
    hintsRemaining--;
    
    // Show notification
    showNotification(`Pista utilizada. Quedan ${hintsRemaining} pistas`, 'info');
}

function gameComplete() {
    // Stop timer
    clearInterval(gameTimer);
    gameStarted = false;
    
    // Calculate final score
    const timeBonus = Math.max(0, 1000 - (minutes * 60 + seconds) * 5);
    const movesBonus = Math.max(0, 500 - moves * 10);
    const finalScore = score + timeBonus + movesBonus;
    
    // Update victory modal
    const victoryTime = document.getElementById('victoryTime');
    const victoryMoves = document.getElementById('victoryMoves');
    const victoryScore = document.getElementById('victoryScore');
    
    if (victoryTime) {
        const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
        const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
        victoryTime.textContent = `${formattedMinutes}:${formattedSeconds}`;
    }
    
    if (victoryMoves) {
        victoryMoves.textContent = moves;
    }
    
    if (victoryScore) {
        victoryScore.textContent = finalScore;
    }
    
    // Show victory modal
    setTimeout(() => {
        const victoryModal = new bootstrap.Modal(document.getElementById('victoryModal'));
        victoryModal.show();
    }, 500);
    
    // Check if score qualifies for leaderboard
    checkLeaderboardQualification(finalScore);
}

function checkLeaderboardQualification(finalScore) {
    // In a real app, this would check against a database
    // For this demo, we'll just show a notification if score is high
    if (finalScore > 1500) {
        setTimeout(() => {
            showNotification('¡Felicidades! Tu puntuación califica para el ranking', 'success');
        }, 2000);
    }
}

function shareScore() {
    // In a real app, this would use the Web Share API or create a shareable link
    const scoreText = `¡He conseguido ${document.getElementById('victoryScore').textContent} puntos en Memory Game Pro!`;
    
    // For this demo, we'll just copy to clipboard
    navigator.clipboard.writeText(scoreText)
        .then(() => {
            showNotification('Puntuación copiada al portapapeles', 'success');
        })
        .catch(() => {
            showNotification('No se pudo compartir la puntuación', 'error');
        });
}

// Leaderboard functions
function populateLeaderboard() {
    const leaderboardBody = document.getElementById('leaderboardBody');
    if (!leaderboardBody) return;
    
    leaderboardBody.innerHTML = '';
    
    leaderboardData.forEach(entry => {
        const row = document.createElement('div');
        row.className = 'leaderboard-entry';
        
        let badgeClass = 'default';
        if (entry.position === 1) badgeClass = 'gold';
        if (entry.position === 2) badgeClass = 'silver';
        if (entry.position === 3) badgeClass = 'bronze';
        
        row.innerHTML = `
            <div class="row align-items-center">
                <div class="col-2 text-center">
                    <div class="position-badge ${badgeClass}">${entry.position}</div>
                </div>
                <div class="col-4">
                    <div class="player-info">
                        <div class="player-name">${entry.name}</div>
                        <div class="player-level">${entry.level}</div>
                    </div>
                </div>
                <div class="col-2 text-center">
                    <div class="player-stat">
                        <div class="player-stat-value">${entry.level}</div>
                        <div class="player-stat-label">Nivel</div>
                    </div>
                </div>
                <div class="col-2 text-center">
                    <div class="player-stat">
                        <div class="player-stat-value">${entry.time}</div>
                        <div class="player-stat-label">Tiempo</div>
                    </div>
                </div>
                <div class="col-2 text-center">
                    <div class="player-stat">
                        <div class="player-stat-value">${entry.score}</div>
                        <div class="player-stat-label">Puntos</div>
                    </div>
                </div>
            </div>
        `;
        
        leaderboardBody.appendChild(row);
    });
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
    
    // Animate hero preview cards
    animateHeroCards();
}

function animateHeroCards() {
    const previewCards = document.querySelectorAll('.preview-card');
    
    previewCards.forEach((card, index) => {
        // Random rotation
        const rotation = Math.random() * 10 - 5;
        card.style.transform = `rotate(${rotation}deg)`;
        
        // Add click effect
        card.addEventListener('click', function() {
            this.style.transform = `rotate(${rotation}deg) scale(1.1)`;
            setTimeout(() => {
                this.style.transform = `rotate(${rotation}deg) scale(1)`;
            }, 200);
        });
    });
}

// Utility functions
function getDifficultyName(difficulty) {
    const names = {
        easy: 'Fácil',
        medium: 'Medio',
        hard: 'Difícil',
        expert: 'Experto'
    };
    
    return names[difficulty] || difficulty;
}

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
    // Refresh AOS
    if (typeof AOS !== 'undefined') {
        AOS.refresh();
    }
}, 250));

// Add CSS for points animation
function addPointsAnimationStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .points-animation {
            position: fixed;
            font-weight: bold;
            font-size: 1.5rem;
            transform: translateY(0);
            opacity: 1;
            transition: all 0.5s ease;
            z-index: 9999;
            pointer-events: none;
        }
        .points-animation.positive {
            color: #4ecdc4;
        }
        .points-animation.negative {
            color: #ff6b6b;
        }
        .game-card.hint {
            animation: hintPulse 1s ease;
            box-shadow: 0 0 15px rgba(255, 230, 102, 0.8);
        }
        @keyframes hintPulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.1); }
        }
    `;
    document.head.appendChild(style);
}

// Add styles on load
addPointsAnimationStyles();

// Console welcome message
console.log('%c🧠 Memory Game Pro', 'color: #667eea; font-size: 24px; font-weight: bold;');
console.log('%cBienvenido a nuestro juego de memoria interactivo', 'color: #764ba2; font-size: 14px;');
console.log('%cDesarrollado con ❤️ para entrenar tu cerebro', 'color: #f093fb; font-size: 12px;');

// Export functions for global access
window.startNewGame = startNewGame;
window.togglePause = togglePause;
window.showHint = showHint;
window.showNotification = showNotification;