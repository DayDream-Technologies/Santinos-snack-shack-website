# Santino's Snack Shack Website

A modern, responsive website for Santino's Snack Shack - an American-Mexican fusion food truck serving the greater Lansing, Michigan area.

## Features

- **Responsive Design**: Fully responsive design that works on all devices
- **Retro Diner Theme**: Bold retro diner aesthetic with cartoon characters and playful fonts
- **Interactive Calendar**: Shows upcoming events where the food truck will be located
- **Booking System**: Contact form for private event bookings and catering requests
- **Retro Menu Display**: Authentic retro diner-style menu with colorful sections and cartoon mascots
- **Social Media Integration**: Links to Facebook and other social platforms
- **Local Focus**: Emphasis on Lansing, Michigan community presence since 2022

## File Structure

```
santinos-snack-shack-website/
├── index.html          # Main website page
├── styles.css          # All styling and responsive design
├── script.js           # Interactive functionality
└── README.md           # This file
```

## Technologies Used

- **HTML5**: Semantic markup and accessibility features
- **CSS3**: Modern styling with CSS Grid, Flexbox, and custom properties
- **Vanilla JavaScript**: Interactive features without dependencies
- **Font Awesome**: Icons for enhanced visual appeal
- **Google Fonts**: Poppins and Dancing Script for typography

## Color Palette

The website uses a bold retro diner color palette:

- **Primary Red**: #DC143C (Bold red for backgrounds and accents)
- **Bright Yellow**: #FFD700 (Golden yellow for highlights and text)
- **Light Blue**: #87CEEB (Sky blue for section backgrounds)
- **Cream White**: #FFFDD0 (Warm background)
- **Black**: #000000 (Strong borders and outlines)
- **White**: #FFFFFF (Clean text contrast)

## Menu Design Features

- **Retro Logo**: Red badge with "EST. 2022 SANTINO'S SNACK SHACK"
- **Cartoon Characters**: Animated food mascots (fries, burger, hotdog, soda)
- **Speech Bubbles**: "GREAT QUALITY FOOD" and "ALWAYS FRESH"
- **Checkerboard Border**: Classic diner racing flag pattern
- **Bold Typography**: Uppercase block letters with text shadows
- **Color-Coded Sections**: 
  - Fries & Sides: Light blue background
  - Hotdogs: Red background  
  - Beverages: Yellow background with scalloped edges
  - Burgers: Cream background with red titles

## Setup Instructions

1. **Clone or download** all files to your web server directory
2. **Images now included**:
   - ✅ Logo image in navigation (`logo.jpg`)
   - ✅ Food truck image in hero section (`Food-Truck.jpg`)
   - ✅ Food truck image in about section
   - 🔄 Still needed: Customer photos from Facebook
   - 🔄 Still needed: Event photos

3. **Update contact information** in `index.html`:
   - Phone number (currently placeholder: (517) 555-TACO)
   - Email address
   - Social media links
   - Actual Facebook page URL

4. **Customize content**:
   - Update menu items and prices based on actual offerings
   - Add real upcoming events to the calendar
   - Modify business description and story
   - Update service area if different from "Greater Lansing"

## Image Placeholders

The website currently includes placeholder areas for images that should be replaced with content from the Facebook page:

### Hero Section
- Main food truck image (large, high-quality)

### About Section
- Kitchen/cooking action shots
- Customer interaction photos

### Menu Section (optional)
- Food photography of signature items

## Customization Guide

### Adding New Events
Edit the `events` object in `script.js`:

```javascript
this.events = {
    '2025-01-15': 'Downtown Lansing Food Festival',
    '2025-01-23': 'Michigan State Campus',
    // Add new events in YYYY-MM-DD format
};
```

### Updating Menu Items
Modify the menu sections in `index.html` within the `.menu-categories` div.

### Changing Colors
Update CSS custom properties in `styles.css`:

```css
:root {
  --primary-red: #DC143C;
  --warm-yellow: #FFD700;
  /* Modify colors here */
}
```

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance Features

- Optimized CSS with minimal unused styles
- Lazy loading setup for images
- Smooth scrolling and animations
- Mobile-first responsive design
- Optimized JavaScript with debouncing/throttling

## Accessibility Features

- Semantic HTML structure
- Proper heading hierarchy
- Focus management for interactive elements
- Alt text placeholders for images
- Keyboard navigation support
- High contrast color combinations

## Future Enhancements

- **PWA Features**: Add service worker for offline functionality
- **Online Ordering**: Integration with food ordering platform
- **Real-time Location**: GPS tracking of food truck location
- **Customer Reviews**: Integration with Google Reviews or similar
- **Newsletter Signup**: Email collection for updates
- **Social Media Feed**: Live feed from Facebook/Instagram
- **Google Maps**: Embedded map showing current location
- **Payment Integration**: For advance orders or deposits

## Contact Information

For website questions or updates, contact the web developer or Santino's Snack Shack directly.

## License

This website template is created specifically for Santino's Snack Shack. All rights reserved.

---

**Note**: Remember to replace all placeholder content with actual business information and images from the Facebook page before going live.