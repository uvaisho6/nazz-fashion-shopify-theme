document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const navToggle = document.getElementById('navToggle');
    const mainNav = document.getElementById('mainNav');
    const header = document.querySelector('.header');
    const navBackdrop = document.getElementById('navBackdrop');
    const body = document.body;
    const menuLinks = mainNav.querySelectorAll('a');
    
    let isNavOpen = false;
    let isScrollingDown = false;
    let lastScroll = 0;
    let scrollTimer = null;

    // Notification System
    const notificationSystem = {
        container: null,
        queue: [],
        timeout: 5000,

        init() {
            // Create notification container
            this.container = document.createElement('div');
            this.container.className = 'notification-container';
            document.body.appendChild(this.container);
        },

        show(message, type = 'info') {
            const notification = document.createElement('div');
            notification.className = `notification notification-${type}`;
            notification.innerHTML = `
                <div class="notification-content">
                    <i class="fas fa-${this.getIcon(type)}"></i>
                    <span>${message}</span>
                </div>
                <button class="notification-close" aria-label="Close notification">
                    <i class="fas fa-times"></i>
                </button>
            `;

            // Add to queue and show
            this.queue.push(notification);
            this.container.appendChild(notification);

            // Animate in
            requestAnimationFrame(() => {
                notification.classList.add('show');
            });

            // Auto dismiss
            const timeout = setTimeout(() => {
                this.dismiss(notification);
            }, this.timeout);

            // Close button
            notification.querySelector('.notification-close').addEventListener('click', () => {
                clearTimeout(timeout);
                this.dismiss(notification);
            });
        },

        dismiss(notification) {
            notification.classList.remove('show');
            notification.addEventListener('transitionend', () => {
                notification.remove();
                this.queue = this.queue.filter(n => n !== notification);
            });
        },

        getIcon(type) {
            const icons = {
                success: 'check-circle',
                error: 'exclamation-circle',
                warning: 'exclamation-triangle',
                info: 'info-circle'
            };
            return icons[type] || icons.info;
        }
    };

    // Recently Viewed Items
    const recentlyViewed = {
        items: [],
        maxItems: 5,
        storageKey: 'recently-viewed',

        init() {
            this.loadFromStorage();
            this.setupEventListeners();
            this.renderWidget();
        },

        loadFromStorage() {
            const stored = localStorage.getItem(this.storageKey);
            this.items = stored ? JSON.parse(stored) : [];
        },

        saveToStorage() {
            localStorage.setItem(this.storageKey, JSON.stringify(this.items));
        },

        addItem(item) {
            // Remove if already exists
            this.items = this.items.filter(i => i.id !== item.id);
            
            // Add to front
            this.items.unshift(item);
            
            // Keep only max items
            if (this.items.length > this.maxItems) {
                this.items.pop();
            }

            this.saveToStorage();
            this.renderWidget();
            
            notificationSystem.show('Item added to recently viewed', 'info');
        },

        renderWidget() {
            const widget = document.querySelector('.recently-viewed');
            if (!widget || !this.items.length) return;

            const list = widget.querySelector('.recently-viewed-list');
            list.innerHTML = this.items.map(item => `
                <div class="recently-viewed-item">
                    <img src="${item.image}" alt="${item.name}">
                    <div class="recently-viewed-info">
                        <h4>${item.name}</h4>
                        <p>${item.price}</p>
                    </div>
                </div>
            `).join('');
        },

        setupEventListeners() {
            // Listen for custom event when viewing products
            document.addEventListener('view-product', (e) => {
                this.addItem(e.detail);
            });
        }
    };

    // Navigation Toggle with animation and ARIA updates
    const toggleNav = (force = null) => {
        isNavOpen = force !== null ? force : !isNavOpen;
        
        // Toggle classes with transition handling
        requestAnimationFrame(() => {
            mainNav.classList.toggle('active', isNavOpen);
            navBackdrop.classList.toggle('active', isNavOpen);
            navToggle.classList.toggle('active', isNavOpen);
            
            // Update ARIA attributes
            navToggle.setAttribute('aria-expanded', isNavOpen);
            navBackdrop.setAttribute('aria-hidden', !isNavOpen);
            
            // Toggle icon with transition
            const icon = navToggle.querySelector('i');
            icon.style.transform = isNavOpen ? 'rotate(90deg)' : '';
            icon.classList.toggle('fa-bars', !isNavOpen);
            icon.classList.toggle('fa-times', isNavOpen);

            // Handle body scroll
            body.style.overflow = isNavOpen ? 'hidden' : '';
            
            // Focus management
            if (isNavOpen) {
                menuLinks[0]?.focus();
            } else {
                navToggle.focus();
            }
        });
    };

    // Event Listeners for Navigation
    navToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleNav();
    });

    navBackdrop.addEventListener('click', () => toggleNav(false));

    // Keyboard Navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && isNavOpen) {
            toggleNav(false);
        }

        // Tab trap for mobile menu
        if (isNavOpen && e.key === 'Tab') {
            const focusableElements = mainNav.querySelectorAll(
                'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])'
            );
            
            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];

            if (e.shiftKey) {
                if (document.activeElement === firstElement) {
                    e.preventDefault();
                    lastElement.focus();
                }
            } else {
                if (document.activeElement === lastElement) {
                    e.preventDefault();
                    firstElement.focus();
                }
            }
        }
    });

    // Smart Header scroll behavior
    const handleScroll = () => {
        if (scrollTimer !== null) {
            clearTimeout(scrollTimer);
        }

        scrollTimer = setTimeout(() => {
            const currentScroll = window.pageYOffset;
            
            if (currentScroll <= 0) {
                header.classList.remove('hidden');
                isScrollingDown = false;
                lastScroll = 0;
                return;
            }

            if (currentScroll > lastScroll && !isScrollingDown) {
                if (currentScroll > 80) {
                    header.classList.add('hidden');
                    isScrollingDown = true;
                    if (isNavOpen) toggleNav(false);
                }
            } else if (currentScroll < lastScroll && isScrollingDown) {
                header.classList.remove('hidden');
                isScrollingDown = false;
            }

            lastScroll = currentScroll;
        }, 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Initialize features
    notificationSystem.init();
    recentlyViewed.init();

    // Form handling with enhanced feedback
    document.querySelectorAll('form').forEach(form => {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const submitBtn = form.querySelector('button[type="submit"]');
            if (!submitBtn) return;

            try {
                // UI feedback
                submitBtn.classList.add('loading');
                submitBtn.disabled = true;

                // Simulate API call
                await new Promise(resolve => setTimeout(resolve, 1500));

                // Success feedback
                submitBtn.classList.remove('loading');
                submitBtn.classList.add('success');
                notificationSystem.show('Form submitted successfully!', 'success');

                // Reset form
                form.reset();

                // Reset button
                setTimeout(() => {
                    submitBtn.classList.remove('success');
                    submitBtn.disabled = false;
                }, 1500);

            } catch (error) {
                submitBtn.classList.remove('loading');
                submitBtn.classList.add('error');
                notificationSystem.show('An error occurred. Please try again.', 'error');

                setTimeout(() => {
                    submitBtn.classList.remove('error');
                    submitBtn.disabled = false;
                }, 1500);
            }
        });
    });

    // Enhanced search with suggestions
    const searchForm = document.querySelector('.search-form');
    if (searchForm) {
        const searchInput = searchForm.querySelector('input[type="search"]');
        const searchBtn = searchForm.querySelector('.search-btn');
        
        let searchTimeout;

        searchInput.addEventListener('input', (e) => {
            clearTimeout(searchTimeout);
            
            searchTimeout = setTimeout(async () => {
                const query = e.target.value.trim();
                if (query.length < 2) return;

                try {
                    // Simulate API call for search suggestions
                    const suggestions = await mockSearchAPI(query);
                    showSearchSuggestions(suggestions);
                } catch (error) {
                    console.error('Search error:', error);
                }
            }, 300);
        });

        searchForm.addEventListener('submit', (e) => {
            e.preventDefault();
            if (!searchInput.value.trim()) return;
            
            searchBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
            searchInput.disabled = true;
            
            // Simulate search
            setTimeout(() => {
                notificationSystem.show('Search results updated', 'info');
                searchBtn.innerHTML = '<i class="fas fa-search"></i>';
                searchInput.disabled = false;
                searchInput.value = '';
                searchInput.focus();
            }, 1000);
        });
    }

    // Mock search API
    async function mockSearchAPI(query) {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 300));
        
        // Mock results
        return [
            `${query} - suggestion 1`,
            `${query} - suggestion 2`,
            `${query} - suggestion 3`
        ];
    }

    function showSearchSuggestions(suggestions) {
        // Implementation for search suggestions UI
        console.log('Search suggestions:', suggestions);
    }
});
