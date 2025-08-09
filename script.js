// ===== MOBILE NAVIGATION =====
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// ===== SMOOTH SCROLLING =====
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

// ===== NAVBAR SCROLL EFFECT =====
let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Change navbar background opacity based on scroll
    if (scrollTop > 100) {
        navbar.style.background = 'rgba(255, 253, 208, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 253, 208, 0.95)';
        navbar.style.boxShadow = 'none';
    }
    
    lastScrollTop = scrollTop;
});

// ===== CUSTOM SCROLLBAR AUTO-HIDE =====
let scrollTimeout;
let isScrolling = false;

function showScrollbar() {
    document.documentElement.classList.add('show-scrollbar');
    document.documentElement.classList.add('scrolling');
    isScrolling = true;
}

function hideScrollbar() {
    document.documentElement.classList.remove('show-scrollbar');
    document.documentElement.classList.remove('scrolling');
    isScrolling = false;
}

// Show scrollbar when scrolling
window.addEventListener('scroll', () => {
    if (!isScrolling) {
        showScrollbar();
    }
    
    // Clear existing timeout
    clearTimeout(scrollTimeout);
    
    // Hide scrollbar after 1.5 seconds of no scrolling
    scrollTimeout = setTimeout(() => {
        hideScrollbar();
    }, 1500);
});

// Show scrollbar on mouse enter the page
document.addEventListener('mouseenter', showScrollbar);

// Hide scrollbar when mouse leaves the page
document.addEventListener('mouseleave', () => {
    if (!isScrolling) {
        hideScrollbar();
    }
});

// Show scrollbar when hovering over the scrollbar area
document.addEventListener('mousemove', (e) => {
    const windowWidth = window.innerWidth;
    const mouseX = e.clientX;
    
    // If mouse is in the scrollbar area (right 20px of screen)
    if (mouseX >= windowWidth - 20) {
        showScrollbar();
    }
});

// Touch device support
let touchTimeout;
window.addEventListener('touchstart', () => {
    showScrollbar();
    clearTimeout(touchTimeout);
});

window.addEventListener('touchend', () => {
    touchTimeout = setTimeout(() => {
        hideScrollbar();
    }, 2000);
});

// ===== CALENDAR FUNCTIONALITY =====
class EventCalendar {
    constructor() {
        this.currentDate = new Date();
        this.events = {
            '2025-01-15': 'Downtown Lansing Food Festival',
            '2025-01-23': 'Michigan State Campus',
            '2025-01-30': 'Lansing City Market',
            '2025-02-05': 'Valentine\'s Day Pop-up',
            '2025-02-14': 'Love Tacos Special Event',
            '2025-02-22': 'Winter Food Truck Rally'
        };
        this.init();
    }
    
    init() {
        this.renderCalendar();
        this.setupEventListeners();
    }
    
    setupEventListeners() {
        const prevBtn = document.querySelector('.prev-month');
        const nextBtn = document.querySelector('.next-month');
        
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                this.currentDate.setMonth(this.currentDate.getMonth() - 1);
                this.renderCalendar();
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                this.currentDate.setMonth(this.currentDate.getMonth() + 1);
                this.renderCalendar();
            });
        }
    }
    
    renderCalendar() {
        const calendarHeader = document.querySelector('.calendar-header h3');
        const calendarGrid = document.querySelector('.calendar-grid');
        
        if (!calendarHeader || !calendarGrid) return;
        
        // Update header
        const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                           'July', 'August', 'September', 'October', 'November', 'December'];
        calendarHeader.textContent = `${monthNames[this.currentDate.getMonth()]} ${this.currentDate.getFullYear()}`;
        
        // Clear existing calendar days (keep headers)
        const existingDays = calendarGrid.querySelectorAll('.calendar-day:not(.header)');
        existingDays.forEach(day => day.remove());
        
        // Get first day of month and number of days
        const firstDay = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), 1);
        const lastDay = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 0);
        const startingDay = firstDay.getDay();
        const numberOfDays = lastDay.getDate();
        
        // Add empty cells for days before month starts
        for (let i = 0; i < startingDay; i++) {
            const emptyDay = document.createElement('div');
            emptyDay.className = 'calendar-day empty';
            calendarGrid.appendChild(emptyDay);
        }
        
        // Add days of month
        for (let day = 1; day <= numberOfDays; day++) {
            const dayElement = document.createElement('div');
            dayElement.className = 'calendar-day';
            dayElement.textContent = day;
            
            // Check if this day has an event
            const dateStr = `${this.currentDate.getFullYear()}-${String(this.currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            if (this.events[dateStr]) {
                dayElement.classList.add('event-day');
                dayElement.setAttribute('data-event', this.events[dateStr]);
                dayElement.addEventListener('click', () => {
                    this.showEventDetails(dateStr, this.events[dateStr]);
                });
            }
            
            calendarGrid.appendChild(dayElement);
        }
    }
    
    showEventDetails(date, eventName) {
        alert(`Event on ${date}:\n${eventName}\n\nClick "Book Us" to reserve our food truck for your event!`);
    }
}

// ===== BOOKING FORM FUNCTIONALITY =====
class BookingForm {
    constructor() {
        this.form = document.querySelector('.booking-form');
        this.init();
    }
    
    init() {
        if (this.form) {
            this.form.addEventListener('submit', this.handleSubmit.bind(this));
            this.setupDateValidation();
        }
    }
    
    setupDateValidation() {
        const dateInput = document.getElementById('event-date');
        if (dateInput) {
            // Set minimum date to today
            const today = new Date().toISOString().split('T')[0];
            dateInput.min = today;
        }
    }
    
    handleSubmit(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this.form);
        const data = Object.fromEntries(formData);
        
        // Basic validation
        if (!this.validateForm(data)) {
            return;
        }
        
        // Simulate form submission
        this.showSuccessMessage(data);
    }
    
    validateForm(data) {
        const required = ['name', 'email', 'event-date', 'guest-count', 'location'];
        const missing = required.filter(field => !data[field]);
        
        if (missing.length > 0) {
            alert(`Please fill in the following required fields:\n${missing.join(', ')}`);
            return false;
        }
        
        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            alert('Please enter a valid email address.');
            return false;
        }
        
        // Validate guest count
        if (data['guest-count'] < 1) {
            alert('Please enter a valid number of guests.');
            return false;
        }
        
        return true;
    }
    
    showSuccessMessage(data) {
        const message = `Thank you, ${data.name}!
        
Your booking request has been submitted. Here's what we received:

Event Date: ${data['event-date']}
Event Type: ${data['event-type'] || 'Not specified'}
Guest Count: ${data['guest-count']}
Location: ${data.location}

We'll get back to you within 24 hours at ${data.email}.

¡Gracias for choosing Santino's Snack Shack!`;
        
        alert(message);
        this.form.reset();
    }
}

// ===== SCROLL ANIMATIONS =====
class ScrollAnimations {
    constructor() {
        this.observer = null;
        this.init();
    }
    
    init() {
        if ('IntersectionObserver' in window) {
            this.setupObserver();
            this.observeElements();
        }
    }
    
    setupObserver() {
        this.observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }
                });
            },
            {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            }
        );
    }
    
    observeElements() {
        const animatedElements = document.querySelectorAll('.menu-category, .event-item, .contact-item, .about-text, .about-images');
        
        animatedElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            this.observer.observe(el);
        });
    }
}

// ===== MENU INTERACTION =====
class MenuInteractions {
    constructor() {
        this.init();
    }
    
    init() {
        this.setupMenuItemHovers();
    }
    
    setupMenuItemHovers() {
        const menuItems = document.querySelectorAll('.menu-item');
        
        menuItems.forEach(item => {
            item.addEventListener('mouseenter', () => {
                item.style.transform = 'translateX(10px)';
                item.style.transition = 'transform 0.3s ease';
            });
            
            item.addEventListener('mouseleave', () => {
                item.style.transform = 'translateX(0)';
            });
        });
    }
}

// ===== SOCIAL MEDIA INTERACTIONS =====
class SocialMedia {
    constructor() {
        this.init();
    }
    
    init() {
        this.setupSocialLinks();
    }
    
    setupSocialLinks() {
        // Add click tracking and navigation for social media links
        const socialLinks = document.querySelectorAll('.social-icon');
        
        socialLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                // Don't prevent default - let the link navigate normally
                const href = link.getAttribute('href');
                
                // If href exists and is not just a placeholder, let it navigate
                if (href && href !== '#' && href.startsWith('http')) {
                    // Link will navigate normally, just add some visual feedback
                    link.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                        link.style.transform = '';
                    }, 150);
                    
                    // Optional: Track the click for analytics
                    console.log(`Social media click: ${href}`);
                } else {
                    // Only prevent default for placeholder links
                    e.preventDefault();
                    const platform = link.classList[1] || 'social media'; // facebook, instagram, etc.
                    alert(`Follow us on ${platform}! Link coming soon...`);
                }
            });
            
            // Add hover effect for better user feedback
            link.addEventListener('mouseenter', () => {
                link.style.transform = 'translateY(-2px) scale(1.05)';
            });
            
            link.addEventListener('mouseleave', () => {
                link.style.transform = '';
            });
        });
    }
}

// ===== UTILITY FUNCTIONS =====
class Utils {
    static debounce(func, wait) {
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
    
    static throttle(func, limit) {
        let lastFunc;
        let lastRan;
        return function() {
            const context = this;
            const args = arguments;
            if (!lastRan) {
                func.apply(context, args);
                lastRan = Date.now();
            } else {
                clearTimeout(lastFunc);
                lastFunc = setTimeout(function() {
                    if ((Date.now() - lastRan) >= limit) {
                        func.apply(context, args);
                        lastRan = Date.now();
                    }
                }, limit - (Date.now() - lastRan));
            }
        };
    }
}

// ===== PERFORMANCE OPTIMIZATION =====
// Lazy load images when they come into view
function setupLazyLoading() {
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

// ===== ACCESSIBILITY IMPROVEMENTS =====
function setupAccessibility() {
    // Add keyboard navigation for calendar
    document.addEventListener('keydown', (e) => {
        if (e.target.classList.contains('calendar-day') && e.target.classList.contains('event-day')) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                e.target.click();
            }
        }
    });
    
    // Add focus management for mobile menu
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            hamburger.click();
            
            // Focus first menu item when menu opens
            if (navMenu.classList.contains('active')) {
                const firstLink = navMenu.querySelector('.nav-link');
                if (firstLink) firstLink.focus();
            }
        }
    });
}

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all components
    new EventCalendar();
    new BookingForm();
    new ScrollAnimations();
    new MenuInteractions();
    new SocialMedia();
    
    // Setup additional features
    setupLazyLoading();
    setupAccessibility();
    
    // Add loading animation completion
    document.body.classList.add('loaded');
    
    console.log('🌮 Santino\'s Snack Shack website loaded successfully! ¡Buen provecho!');
});

// ===== SERVICE WORKER REGISTRATION (for future PWA features) =====
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Uncomment when service worker is implemented
        // navigator.serviceWorker.register('/sw.js')
        //     .then(registration => console.log('SW registered: ', registration))
        //     .catch(registrationError => console.log('SW registration failed: ', registrationError));
    });
}

// ===== GOOGLE ANALYTICS PLACEHOLDER =====
// Replace with actual Google Analytics code when available
function setupAnalytics() {
    // Placeholder for Google Analytics or other tracking
    console.log('Analytics tracking initialized');
}

// ===== ERROR HANDLING =====
window.addEventListener('error', (e) => {
    console.error('JavaScript error:', e.error);
    // In production, you might want to send this to an error tracking service
});

// ===== CONTACT FORM (if added later) =====
function setupContactForm() {
    const contactForm = document.querySelector('#contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Handle contact form submission
            alert('Thank you for your message! We\'ll get back to you soon.');
        });
    }
}

// Export for testing (if using modules)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        EventCalendar,
        BookingForm,
        ScrollAnimations,
        Utils
    };
}