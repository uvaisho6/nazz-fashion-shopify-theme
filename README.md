# Nazz Fashion Shopify Theme

A comprehensive e-commerce theme for clothing and print-on-demand products, featuring a modern design and extensive customization options.

## Features

1. **Customizable Sections**
   - Header with dynamic navigation and cart
   - Hero section with customizable content
   - Featured collections with flexible layouts
   - Footer with newsletter and social media integration

2. **Product Features**
   - Advanced product filtering
   - Size guide integration
   - Product image zoom
   - Related products suggestions
   - Product variants support
   - Quick view functionality
   - Wishlist system
   - Recently viewed products

3. **Shopping Experience**
   - Advanced cart drawer
   - Quantity validation
   - Stock management
   - Promo code system
   - Smart product recommendations
   - Multiple payment options
   - Easy checkout flow

4. **Mobile-First Design**
   - Responsive across all devices
   - Mobile-optimized navigation
   - Touch-friendly interfaces
   - Fast loading performance

## Theme Structure

```
nazz-fashion/
├── assets/
│   ├── script.js
│   ├── shopify-export.js
│   └── styles.css
├── config/
│   └── settings_schema.json
├── layout/
│   └── theme.liquid
├── sections/
│   ├── header.liquid
│   ├── footer.liquid
│   ├── hero.liquid
│   └── featured-collection.liquid
├── snippets/
│   └── product-card.liquid
└── templates/
    ├── index.liquid
    ├── product.liquid
    ├── collection.liquid
    ├── cart.liquid
    ├── page.liquid
    └── page.contact.liquid
```

## Installation

1. **Download the Theme**
   ```bash
   git clone https://github.com/uvaisho6/nazz-fashion-shopify-theme.git
   ```

2. **Import to Shopify**
   - Go to your Shopify admin panel
   - Navigate to Online Store > Themes
   - Click "Add theme" > "Upload zip file"
   - Select the downloaded theme archive

## Configuration

1. **Theme Settings**
   - Colors and typography
   - Header and footer options
   - Product page layouts
   - Collection page settings
   - Cart and checkout customization

2. **Required Setup**
   - Create navigation menus
     * Main menu for header
     * Footer menu for footer links
   - Set up collections
   - Configure product options
   - Add store information

3. **Optional Features**
   - Newsletter signup
   - Social media links
   - Size guide configuration
   - Payment icons
   - Custom CSS/JS

## Customization

### Header Section
- Logo upload and size adjustment
- Navigation menu configuration
- Search, account, and cart toggles
- Color and styling options

### Homepage Sections
- Hero section with customizable:
  * Headings and text
  * Background colors
  * Button styles
  * Layout options
- Featured collections with:
  * Product grid layouts
  * Sorting options
  * Filtering capabilities

### Product Pages
- Image gallery options
- Product information layout
- Variant selectors
- Size guide integration
- Related products display

### Footer Options
- About text
- Social media links
- Newsletter configuration
- Payment methods display
- Menu and links setup

## Development

To modify the theme:

1. **Local Development**
   ```bash
   # Clone the repository
   git clone https://github.com/uvaisho6/nazz-fashion-shopify-theme.git
   cd nazz-fashion-shopify-theme

   # Make your changes
   
   # Commit and push
   git add .
   git commit -m "Your changes"
   git push origin main
   ```

2. **Theme Structure**
   - Use sections for modular components
   - Follow Shopify's liquid template standards
   - Maintain mobile-first approach
   - Keep performance in mind

## Support

For support, please open an issue in the GitHub repository or contact our support team.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Author

Nazz Collection

## Version History

- 2.0.0 - Added customizable sections and templates
- 1.0.0 - Initial release
