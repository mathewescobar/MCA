// Air Quality Monitor Functionality
let isMonitorActive = true;
let currentQuality = 85;

// Quality levels configuration
const qualityLevels = {
    excellent: { min: 90, max: 100, status: 'Excelente', color: '#059669' },
    good: { min: 70, max: 89, status: 'Bien', color: '#10b981' },
    moderate: { min: 50, max: 69, status: 'Moderado', color: '#f59e0b' },
    poor: { min: 0, max: 49, status: 'Mal', color: '#ef4444' }
};

// DOM Elements
const qualityCircle = document.getElementById('qualityCircle');
const qualityPercentage = document.getElementById('qualityPercentage');
const qualityStatus = document.getElementById('qualityStatus');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const contactForm = document.getElementById('contactForm');

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    updateQualityDisplay();
    setupSmoothScrolling();
    setupFormHandling();
    setupMobileMenu();
    startAutoUpdate();
});

// Update quality display
function updateQualityDisplay() {
    const level = getQualityLevel(currentQuality);
    
    qualityPercentage.textContent = `${currentQuality}%`;
    qualityStatus.textContent = level.status;
    
    // Update circle gradient based on quality
    const gradient = generateGradient(currentQuality);
    qualityCircle.style.background = gradient;
    
    // Add animation effect
    qualityCircle.style.transform = 'scale(1.05)';
    setTimeout(() => {
        qualityCircle.style.transform = 'scale(1)';
    }, 200);
}

// Get quality level based on percentage
function getQualityLevel(percentage) {
    for (const [key, level] of Object.entries(qualityLevels)) {
        if (percentage >= level.min && percentage <= level.max) {
            return level;
        }
    }
    return qualityLevels.poor;
}

// Generate gradient based on quality
function generateGradient(percentage) {
    const level = getQualityLevel(percentage);
    const angle = (percentage / 100) * 360;
    
    return `conic-gradient(from 0deg, ${level.color} 0deg, ${level.color} ${angle}deg, #e5e7eb ${angle}deg, #e5e7eb 360deg)`;
}

// Simulate new reading
function simulateReading() {
    if (!isMonitorActive) return;
    
    // Generate random quality value
    currentQuality = Math.floor(Math.random() * 100) + 1;
    
    // Add loading effect
    qualityPercentage.textContent = '...';
    qualityStatus.textContent = 'Midiendo';
    
    setTimeout(() => {
        updateQualityDisplay();
        showNotification('Nueva lectura realizada');
    }, 1500);
}

// Toggle monitor on/off
function toggleMonitor() {
    isMonitorActive = !isMonitorActive;
    
    if (isMonitorActive) {
        qualityCircle.style.opacity = '1';
        qualityPercentage.textContent = `${currentQuality}%`;
        qualityStatus.textContent = getQualityLevel(currentQuality).status;
        showNotification('Monitor activado');
    } else {
        qualityCircle.style.opacity = '0.5';
        qualityPercentage.textContent = 'OFF';
        qualityStatus.textContent = 'Desactivado';
        showNotification('Monitor desactivado');
    }
}

// Show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: #2563eb;
        color: white;
        padding: 1rem 2rem;
        border-radius: 8px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        z-index: 1001;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Auto update quality readings
function startAutoUpdate() {
    setInterval(() => {
        if (isMonitorActive && Math.random() > 0.7) {
            // Simulate natural fluctuations
            const change = Math.floor(Math.random() * 10) - 5;
            currentQuality = Math.max(1, Math.min(100, currentQuality + change));
            updateQualityDisplay();
        }
    }, 10000); // Update every 10 seconds
}

// Setup smooth scrolling
function setupSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link');
    
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
                
                // Close mobile menu if open
                navMenu.classList.remove('active');
            }
        });
    });
}

// Setup form handling
function setupFormHandling() {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // Simulate form submission
        const submitBtn = this.querySelector('.btn-submit');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Enviando...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            showNotification('Mensaje enviado correctamente');
            this.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
}

// Setup mobile menu
function setupMobileMenu() {
    hamburger.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        
        // Animate hamburger
        this.classList.toggle('active');
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
}

// Add scroll effect to header
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 30px rgba(0, 0, 0, 0.15)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
});

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .hamburger.active span:nth-child(1) {
        transform: rotate(-45deg) translate(-5px, 6px);
    }
    
    .hamburger.active span:nth-child(2) {
        opacity: 0;
    }
    
    .hamburger.active span:nth-child(3) {
        transform: rotate(45deg) translate(-5px, -6px);
    }
`;
document.head.appendChild(style);

// Add intersection observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function() {
    const animateElements = document.querySelectorAll('.team-member, .feature-card, .photo-card, .contact-item');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        observer.observe(el);
    });
});