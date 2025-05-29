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
        let visibleItems = [];
        let hiddenItems = [];
        
        // Separate visible and hidden items
        galleryItems.forEach(item => {
            const category = item.getAttribute('data-category');
            
            if (filter === 'all' || category === filter) {
                visibleItems.push(item);
                item.classList.remove('filtered-out');
            } else {
                hiddenItems.push(item);
                item.classList.add('filtered-out');
            }
        });
        
        // Rearrange items: visible items first, then hidden items
        const allItems = [...visibleItems, ...hiddenItems];
        
        // Clear the grid
        galleryGrid.innerHTML = '';
        
        // Re-append items in new order
        allItems.forEach((item, index) => {
            galleryGrid.appendChild(item);
            
            if (visibleItems.includes(item)) {
                // Animate visible items in with staggered timing
                item.style.opacity = '0';
                item.style.transform = 'scale(0.8)';
                
                setTimeout(() => {
                    item.style.transition = 'all 0.3s ease';
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                }, index * 50);
            } else {
                // Hide filtered items
                item.style.opacity = '0';
                item.style.transform = 'scale(0.8)';
            }
        });
        
        // Show/hide empty message
        if (visibleItems.length === 0) {
            emptyMessage.style.display = 'block';
        } else {
            emptyMessage.style.display = 'none';
        }
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
        let visibleItems = [];
        let hiddenItems = [];
        
        galleryItems.forEach(item => {
            const title = item.getAttribute('data-title').toLowerCase();
            const category = item.getAttribute('data-category').toLowerCase();
            
            const matchesSearch = title.includes(searchTerm) || category.includes(searchTerm);
            const matchesFilter = currentFilter === 'all' || item.getAttribute('data-category') === currentFilter;
            
            if (matchesSearch && matchesFilter) {
                visibleItems.push(item);
                item.classList.remove('filtered-out');
            } else {
                hiddenItems.push(item);
                item.classList.add('filtered-out');
            }
        });
        
        // Rearrange items: visible items first, then hidden items
        const allItems = [...visibleItems, ...hiddenItems];
        
        // Clear and re-append items
        galleryGrid.innerHTML = '';
        allItems.forEach((item, index) => {
            galleryGrid.appendChild(item);
            
            if (visibleItems.includes(item)) {
                item.style.opacity = '1';
                item.style.transform = 'scale(1)';
            } else {
                item.style.opacity = '0';
                item.style.transform = 'scale(0.8)';
            }
        });
        
        // Show/hide empty message
        if (visibleItems.length === 0) {
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
    
    // Enhanced lightbox integration with category filtering
    const lightboxImages = document.querySelectorAll('.gallery-item img');
    let currentGalleryImages = [];
    let currentImageIndex = 0;
    
    function updateGalleryImages() {
        // Get currently visible images based on active filter
        const visibleItems = document.querySelectorAll('.gallery-item:not(.filtered-out)');
        currentGalleryImages = Array.from(visibleItems).map(item => {
            const img = item.querySelector('img');
            return {
                src: img.src,
                title: img.getAttribute('data-title') || img.alt,
                category: img.getAttribute('data-category'),
                element: img
            };
        });
    }
    
    function openGalleryLightbox(imageIndex) {
        if (currentGalleryImages.length === 0) return;
        
        currentImageIndex = imageIndex;
        const image = currentGalleryImages[currentImageIndex];
        
        // Create enhanced lightbox content
        const lightboxContent = `
            <a id="close"></a>
            <a id="next" style="display: ${currentGalleryImages.length > 1 ? 'block' : 'none'}">&rsaquo;</a>
            <a id="prev" style="display: ${currentGalleryImages.length > 1 ? 'block' : 'none'}">&lsaquo;</a>
            <div class="img gallery-lightbox" style="background: url('${image.src}') center center / contain no-repeat;" title="${image.title}">
                <img src="${image.src}" alt="${image.title}" />
            </div>
            <div class="gallery-lightbox-caption">
                <h3>${image.title}</h3>
                <p class="category">${image.category}</p>
                <p class="counter">${currentImageIndex + 1} of ${currentGalleryImages.length}</p>
            </div>
        `;
        
        document.getElementById('lightbox').innerHTML = lightboxContent;
        document.getElementById('lightbox').style.display = 'block';
        document.getElementById('lightbox').classList.add('gallery');
        
        // Add click to close functionality
        document.getElementById('lightbox').addEventListener('click', function(e) {
            if (e.target.id === 'lightbox' || e.target.id === 'close') {
                closeLightbox();
            }
        });
        
        // Add navigation event listeners
        if (currentGalleryImages.length > 1) {
            document.getElementById('next').addEventListener('click', function(e) {
                e.stopPropagation();
                navigateGallery(1);
            });
            
            document.getElementById('prev').addEventListener('click', function(e) {
                e.stopPropagation();
                navigateGallery(-1);
            });
        }
        
        // Add keyboard navigation
        document.addEventListener('keydown', handleKeyboardNavigation);
    }
    
    function navigateGallery(direction) {
        currentImageIndex += direction;
        
        if (currentImageIndex >= currentGalleryImages.length) {
            currentImageIndex = 0;
        } else if (currentImageIndex < 0) {
            currentImageIndex = currentGalleryImages.length - 1;
        }
        
        const image = currentGalleryImages[currentImageIndex];
        
        // Update lightbox content
        const imgElement = document.querySelector('#lightbox .img');
        const captionElement = document.querySelector('.gallery-lightbox-caption');
        
        imgElement.style.background = `url('${image.src}') center center / contain no-repeat`;
        imgElement.querySelector('img').src = image.src;
        imgElement.querySelector('img').alt = image.title;
        
        captionElement.querySelector('h3').textContent = image.title;
        captionElement.querySelector('.category').textContent = image.category;
        captionElement.querySelector('.counter').textContent = `${currentImageIndex + 1} of ${currentGalleryImages.length}`;
    }
    
    function handleKeyboardNavigation(e) {
        if (document.getElementById('lightbox').style.display === 'block') {
            switch(e.key) {
                case 'ArrowLeft':
                    e.preventDefault();
                    navigateGallery(-1);
                    break;
                case 'ArrowRight':
                    e.preventDefault();
                    navigateGallery(1);
                    break;
                case 'Escape':
                    e.preventDefault();
                    closeLightbox();
                    break;
            }
        }
    }
    
    function closeLightbox() {
        document.getElementById('lightbox').innerHTML = '';
        document.getElementById('lightbox').style.display = 'none';
        document.getElementById('lightbox').classList.remove('gallery');
        document.removeEventListener('keydown', handleKeyboardNavigation);
    }
    
    // Add click listeners to gallery images
    lightboxImages.forEach((img, index) => {
        img.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Update the current gallery images based on filter
            updateGalleryImages();
            
            // Find the index of this image in the current filtered set
            const clickedImageSrc = this.src;
            const imageIndex = currentGalleryImages.findIndex(image => image.src === clickedImageSrc);
            
            if (imageIndex !== -1) {
                openGalleryLightbox(imageIndex);
            }
        });
        
        // Add cursor pointer to indicate clickable
        img.style.cursor = 'pointer';
    });
    
    // Update gallery images when filter changes
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Small delay to ensure filtering is complete
            setTimeout(updateGalleryImages, 100);
        });
    });
    
    // Initialize gallery images on load
    updateGalleryImages();
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
