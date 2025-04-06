/**
 * Nazz Fashion - Shopify Export Utility
 * This script helps export the Nazz Fashion theme to Shopify
 */

const shopifyExport = {
    init() {
        this.createExportButton();
        this.setupEventListeners();
    },
    
    createExportButton() {
        // Create export button in admin panel
        const adminPanel = document.querySelector('.admin-panel') || document.createElement('div');
        
        if (!document.body.contains(adminPanel)) {
            adminPanel.className = 'admin-panel';
            document.body.appendChild(adminPanel);
        }
        
        const exportButton = document.createElement('button');
        exportButton.className = 'shopify-export-btn';
        exportButton.innerHTML = '<i class="fab fa-shopify"></i> Export to Shopify';
        
        adminPanel.appendChild(exportButton);
    },
    
    setupEventListeners() {
        // Handle export button click
        document.addEventListener('click', (e) => {
            if (e.target.closest('.shopify-export-btn')) {
                this.showExportModal();
            }
        });
    },
    
    showExportModal() {
        // Create modal
        const modal = document.createElement('div');
        modal.className = 'export-modal';
        modal.innerHTML = `
            <div class="export-container">
                <div class="export-header">
                    <h2>Export to Shopify</h2>
                    <button class="close-export" aria-label="Close export modal">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="export-content">
                    <div class="export-steps">
                        <div class="export-step">
                            <div class="step-number">1</div>
                            <div class="step-content">
                                <h3>Download Theme Files</h3>
                                <p>Download the Nazz Fashion theme files as a ZIP archive.</p>
                                <button class="download-theme-btn">Download Theme Files</button>
                            </div>
                        </div>
                        
                        <div class="export-step">
                            <div class="step-number">2</div>
                            <div class="step-content">
                                <h3>Upload to Shopify</h3>
                                <p>Log in to your Shopify admin panel and go to Online Store > Themes.</p>
                                <p>Click "Add theme" > "Upload zip file" and select the downloaded ZIP file.</p>
                            </div>
                        </div>
                        
                        <div class="export-step">
                            <div class="step-number">3</div>
                            <div class="step-content">
                                <h3>Customize Your Theme</h3>
                                <p>After uploading, click "Customize" to adjust colors, fonts, and other settings.</p>
                                <p>Add your products, collections, and content to complete your store setup.</p>
                            </div>
                        </div>
                    </div>
                    
                    <div class="export-options">
                        <h3>Export Options</h3>
                        <div class="option-group">
                            <label class="checkbox-label">
                                <input type="checkbox" checked id="include-demo-products">
                                <span class="checkbox-custom"></span>
                                Include demo products
                            </label>
                            <p class="option-description">Export sample product data to help you get started quickly.</p>
                        </div>
                        
                        <div class="option-group">
                            <label class="checkbox-label">
                                <input type="checkbox" checked id="include-settings">
                                <span class="checkbox-custom"></span>
                                Include theme settings
                            </label>
                            <p class="option-description">Export theme settings like colors, fonts, and layout options.</p>
                        </div>
                        
                        <div class="option-group">
                            <label class="checkbox-label">
                                <input type="checkbox" checked id="optimize-assets">
                                <span class="checkbox-custom"></span>
                                Optimize assets for Shopify
                            </label>
                            <p class="option-description">Compress images and minify CSS/JS for better performance.</p>
                        </div>
                    </div>
                </div>
                <div class="export-footer">
                    <button class="export-help-btn">Need Help?</button>
                    <button class="start-export-btn">Export Now</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Show modal with animation
        setTimeout(() => {
            modal.classList.add('open');
        }, 10);
        
        // Setup event listeners
        modal.addEventListener('click', (e) => {
            // Close modal
            if (e.target.closest('.close-export') || e.target === modal) {
                modal.classList.remove('open');
                setTimeout(() => {
                    modal.remove();
                }, 300);
            }
            
            // Download theme
            if (e.target.closest('.download-theme-btn') || e.target.closest('.start-export-btn')) {
                this.prepareExport(modal);
            }
            
            // Help button
            if (e.target.closest('.export-help-btn')) {
                window.open('https://help.shopify.com/en/manual/online-store/themes/adding-themes', '_blank');
            }
        });
    },
    
    prepareExport(modal) {
        // Show loading state
        const exportBtn = modal.querySelector('.start-export-btn');
        const downloadBtn = modal.querySelector('.download-theme-btn');
        
        exportBtn.disabled = true;
        downloadBtn.disabled = true;
        exportBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Preparing...';
        downloadBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Preparing...';
        
        // Get export options
        const includeProducts = modal.querySelector('#include-demo-products').checked;
        const includeSettings = modal.querySelector('#include-settings').checked;
        const optimizeAssets = modal.querySelector('#optimize-assets').checked;
        
        // Simulate export preparation (would be an actual API call in production)
        setTimeout(() => {
            this.generateThemePackage(modal, {
                includeProducts,
                includeSettings,
                optimizeAssets
            });
        }, 2000);
    },
    
    generateThemePackage(modal, options) {
        // In a real implementation, this would generate a ZIP file with the theme files
        // For this demo, we'll just show a success message
        
        const exportContent = modal.querySelector('.export-content');
        exportContent.innerHTML = `
            <div class="export-success">
                <div class="success-icon">
                    <i class="fas fa-check-circle"></i>
                </div>
                <h3>Export Successful!</h3>
                <p>Your Nazz Fashion theme has been exported successfully.</p>
                <p>The theme package includes:</p>
                <ul class="export-details">
                    <li>All theme templates and assets</li>
                    ${options.includeProducts ? '<li>Demo product data</li>' : ''}
                    ${options.includeSettings ? '<li>Theme settings and configurations</li>' : ''}
                    ${options.optimizeAssets ? '<li>Optimized images and code</li>' : ''}
                </ul>
                <p class="export-note">Your theme is now ready to be uploaded to Shopify.</p>
                <button class="download-package-btn">Download Theme Package</button>
            </div>
        `;
        
        // Update footer
        const exportFooter = modal.querySelector('.export-footer');
        exportFooter.innerHTML = `
            <button class="close-export-btn">Close</button>
            <a href="https://partners.shopify.com/" target="_blank" class="shopify-partners-btn">
                Join Shopify Partners
            </a>
        `;
        
        // Setup new event listeners
        modal.querySelector('.download-package-btn').addEventListener('click', () => {
            this.downloadThemePackage();
        });
        
        modal.querySelector('.close-export-btn').addEventListener('click', () => {
            modal.classList.remove('open');
            setTimeout(() => {
                modal.remove();
            }, 300);
        });
    },
    
    downloadThemePackage() {
        // In a real implementation, this would trigger the download of the ZIP file
        // For this demo, we'll just show a notification
        
        const notification = document.createElement('div');
        notification.className = 'export-notification';
        notification.innerHTML = `
            <i class="fas fa-download"></i>
            <span>Your theme package is downloading...</span>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
        
        // Create a dummy download link (in a real implementation, this would point to the actual file)
        const link = document.createElement('a');
        link.href = '#';
        link.download = 'nazz-fashion-theme.zip';
        link.click();
    }
};

// Initialize Shopify export utility
document.addEventListener('DOMContentLoaded', () => {
    shopifyExport.init();
});
