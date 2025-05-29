/**
 * Custom JavaScript for HugoBricks Site
 * 
 * This file contains custom JavaScript functionality for the site,
 * including image handling, accessibility improvements, and other enhancements.
 */

// Utility functions
const utils = {
    /**
     * Debounce function to limit function calls
     */
    debounce: function(func, delay) {
        let timeoutId;
        return function(...args) {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => func.apply(this, args), delay);
        };
    },

    /**
     * Check if element is in viewport
     */
    isInViewport: function(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
};

// Image optimization and accessibility enhancements
const imageEnhancements = {
    /**
     * Add alt text validation for images
     */
    validateAltText: function() {
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            if (!img.alt || img.alt.trim() === '') {
                console.warn('Image missing alt text:', img.src);
                // Add a default alt text for accessibility
                img.alt = 'Image';
            }
        });
    },

    /**
     * Lazy load images that aren't already lazy loaded
     */
    initLazyLoading: function() {
        const images = document.querySelectorAll('img:not([loading="lazy"])');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                            img.removeAttribute('data-src');
                        }
                        observer.unobserve(img);
                    }
                });
            });

            images.forEach(img => imageObserver.observe(img));
        }
    },

    /**
     * Handle image loading errors
     */
    handleImageErrors: function() {
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            img.addEventListener('error', function() {
                console.warn('Failed to load image:', this.src);
                this.alt = 'Image failed to load';
                this.style.display = 'none';
            });
        });
    }
};

// Shortcode-specific enhancements
const shortcodeEnhancements = {
    /**
     * Enhance panoramic images with keyboard navigation
     */
    enhancePanoramicImages: function() {
        const panoImages = document.querySelectorAll('.panoramic-image img');
        
        panoImages.forEach(img => {
            // Make images focusable for keyboard navigation
            img.setAttribute('tabindex', '0');
            
            // Add keyboard controls for panning
            img.addEventListener('keydown', function(e) {
                if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
                    e.preventDefault();
                    const scrollAmount = this.clientWidth * 0.1;
                    if (e.key === 'ArrowLeft') {
                        this.scrollLeft -= scrollAmount;
                    } else {
                        this.scrollLeft += scrollAmount;
                    }
                }
            });
        });
    },

    /**
     * Add touch/swipe support for mobile devices
     */
    addTouchSupport: function() {
        let startX = 0;
        let scrollLeft = 0;

        const panoImages = document.querySelectorAll('.panoramic-image img');
        
        panoImages.forEach(img => {
            img.addEventListener('touchstart', function(e) {
                startX = e.touches[0].pageX - this.offsetLeft;
                scrollLeft = this.scrollLeft;
            });

            img.addEventListener('touchmove', function(e) {
                if (!startX) return;
                e.preventDefault();
                const x = e.touches[0].pageX - this.offsetLeft;
                const walk = (x - startX) * 2;
                this.scrollLeft = scrollLeft - walk;
            });

            img.addEventListener('touchend', function() {
                startX = 0;
            });
        });
    }
};

// Accessibility improvements
const accessibilityEnhancements = {
    /**
     * Add skip links for keyboard navigation
     */
    addSkipLinks: function() {
        const main = document.querySelector('main') || document.querySelector('#main');
        if (main && !document.querySelector('.skip-link')) {
            const skipLink = document.createElement('a');
            skipLink.href = '#main';
            skipLink.className = 'skip-link';
            skipLink.textContent = 'Skip to main content';
            skipLink.style.cssText = `
                position: absolute;
                top: -40px;
                left: 6px;
                background: #000;
                color: #fff;
                padding: 8px;
                text-decoration: none;
                z-index: 1000;
                border-radius: 4px;
            `;
            
            skipLink.addEventListener('focus', function() {
                this.style.top = '6px';
            });
            
            skipLink.addEventListener('blur', function() {
                this.style.top = '-40px';
            });
            
            document.body.insertBefore(skipLink, document.body.firstChild);
            main.setAttribute('id', 'main');
        }
    },

    /**
     * Improve focus indicators
     */
    improveFocusIndicators: function() {
        const style = document.createElement('style');
        style.textContent = `
            .shortcode-image img:focus {
                outline: 2px solid #007cba;
                outline-offset: 2px;
            }
            
            .offset-image:focus-within {
                box-shadow: 0 0 0 2px #007cba;
            }
        `;
        document.head.appendChild(style);
    }
};

// Performance monitoring
const performanceMonitor = {
    /**
     * Monitor image loading performance
     */
    monitorImageLoading: function() {
        if ('PerformanceObserver' in window) {
            const observer = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                entries.forEach(entry => {
                    if (entry.name.includes('image') && entry.duration > 1000) {
                        console.warn('Slow image loading detected:', entry.name, `${entry.duration}ms`);
                    }
                });
            });
            
            observer.observe({ entryTypes: ['resource'] });
        }
    }
};

// Initialize all enhancements when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('Initializing custom site enhancements...');
    
    // Image enhancements
    imageEnhancements.validateAltText();
    imageEnhancements.initLazyLoading();
    imageEnhancements.handleImageErrors();
    
    // Shortcode enhancements
    shortcodeEnhancements.enhancePanoramicImages();
    shortcodeEnhancements.addTouchSupport();
    
    // Accessibility improvements
    accessibilityEnhancements.addSkipLinks();
    accessibilityEnhancements.improveFocusIndicators();
    
    // Performance monitoring (only in development)
    if (window.location.hostname === 'localhost') {
        performanceMonitor.monitorImageLoading();
    }
    
    console.log('Custom site enhancements initialized successfully.');
});

// Export for potential use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        utils,
        imageEnhancements,
        shortcodeEnhancements,
        accessibilityEnhancements,
        performanceMonitor
    };
}
