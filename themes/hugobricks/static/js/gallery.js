// Gallery filtering functionality
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const galleryGrid = document.getElementById('gallery-grid');
    const emptyMessage = document.querySelector('.gallery-empty');
    
    if (!filterButtons.length || !galleryItems.length) return;
    
    // Initialize gallery
    let currentFilter = 'all';
    
    // Filter functionality
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter items
            filterGallery(filter);
            currentFilter = filter;
        });
    });
    
    function filterGallery(filter) {
        let visibleCount = 0;
        
        galleryItems.forEach(item => {
            const category = item.getAttribute('data-category');
            
            if (filter === 'all' || category === filter) {
                item.classList.remove('filtered-out');
                visibleCount++;
                
                // Animate in
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                }, Math.random() * 200);
            } else {
                item.classList.add('filtered-out');
                item.style.opacity = '0';
                item.style.transform = 'scale(0.8)';
            }
        });
        
        // Show/hide empty message
        if (visibleCount === 0) {
            emptyMessage.style.display = 'block';
        } else {
            emptyMessage.style.display = 'none';
        }
        
        // Animate grid reorganization
        setTimeout(() => {
            galleryGrid.style.transition = 'all 0.3s ease';
        }, 100);
    }
    
    // Search functionality (if search input exists)
    const searchInput = document.querySelector('.gallery-search');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            searchGallery(searchTerm);
        });
    }
    
    function searchGallery(searchTerm) {
        let visibleCount = 0;
        
        galleryItems.forEach(item => {
            const title = item.getAttribute('data-title').toLowerCase();
            const category = item.getAttribute('data-category').toLowerCase();
            
            const matchesSearch = title.includes(searchTerm) || category.includes(searchTerm);
            const matchesFilter = currentFilter === 'all' || item.getAttribute('data-category') === currentFilter;
            
            if (matchesSearch && matchesFilter) {
                item.classList.remove('filtered-out');
                visibleCount++;
            } else {
                item.classList.add('filtered-out');
            }
        });
        
        // Show/hide empty message
        if (visibleCount === 0) {
            emptyMessage.style.display = 'block';
        } else {
            emptyMessage.style.display = 'none';
        }
    }
    
    // Lazy loading for gallery images
    const galleryImages = document.querySelectorAll('.gallery-item img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });
        
        galleryImages.forEach(img => {
            imageObserver.observe(img);
        });
    }
    
    // Enhanced lightbox integration
    const lightboxImages = document.querySelectorAll('[data-lightbox="gallery"]');
    lightboxImages.forEach(img => {
        img.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            const title = this.getAttribute('data-title');
            
            // Add category info to lightbox if possible
            setTimeout(() => {
                const lightboxCaption = document.querySelector('.lb-caption');
                if (lightboxCaption && category) {
                    lightboxCaption.innerHTML = `
                        <div class="lb-details">
                            <div class="lb-caption">${title}</div>
                            <div class="lb-category">${category}</div>
                        </div>
                    `;
                }
            }, 100);
        });
    });
});

// Debounce function for performance
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
