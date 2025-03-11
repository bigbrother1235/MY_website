# Futuristic Portfolio Website

A visually stunning, highly customizable portfolio website with a futuristic tech-inspired design, dynamic animations, and easy content management for non-technical users.

## Features

- **Futuristic Design** - Dark mode with neon accents, modern typography, and tech-inspired visual elements
- **Dynamic Animations** - Scroll-triggered animations, hover effects, particle background, and smooth page transitions
- **Responsive Layout** - Optimal viewing experience on all devices (mobile, tablet, desktop)
- **Easy Content Management** - All content stored in a single JSON file for simple editing
- **Accessibility** - WCAG compliant with support for keyboard navigation and screen readers
- **Performance Optimized** - Fast load times with efficient animations and resource loading

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn package manager

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/portfolio-website.git
   cd portfolio-website
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Start the development server
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## Content Management

All website content is stored in `src/data/data.json`. This file can be edited directly to update the website content without touching any code.

### Updating Content

1. Open `src/data/data.json` in any text editor
2. Find the section you want to modify
3. Update the content as needed
4. Save the file
5. Refresh the website to see your changes

### Content Structure

The JSON file is organized into the following sections:

- **siteInfo** - General website information (title, description, etc.)
- **navigation** - Navigation links and social media profiles
- **homePage** - Hero section and featured content
- **about** - Biography, skills, experience, and education
- **portfolio** - Project categories and details
- **blog** - Articles and blog posts
- **contact** - Contact information and form settings
- **theme** - Color scheme and theme settings

## Customization

### Changing Colors

To change the color scheme:

1. Edit the `theme` section in `data.json`
2. Update the color values (use hex color codes)
3. Save the file

### Adding New Projects

To add a new project:

1. Add project images to the `/public/assets/images/projects/` directory
2. Edit the `portfolio.projects` array in `data.json`
3. Add a new project object with all required fields
4. Set `featured: true` if you want it to appear on the homepage

### Adding Blog Articles

To add a new blog article:

1. Add article images to the `/public/assets/images/blog/` directory
2. Edit the `blog.articles` array in `data.json`
3. Add a new article object with all required fields
4. Content can be written in Markdown format

## Deployment

### Build for Production

```bash
npm run build
```

This creates a `dist` directory with optimized production build ready for deployment.

### Deployment Options

- **Netlify**: Connect your GitHub repository for automatic deployments
- **Vercel**: Import your project for automatic deployments
- **GitHub Pages**: Deploy the `dist` directory
- **Any Static Hosting**: Upload the `dist` directory to your hosting provider

## Technologies Used

- **React** - UI library
- **Vite** - Build tool and development server
- **React Router** - Client-side routing
- **GSAP** - Advanced animations
- **Framer Motion** - Component animations and transitions
- **Three.js** - 3D background elements (optional)

## Browser Support

- Chrome (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Edge (last 2 versions)
- iOS Safari and Android Chrome

## License

This project is licensed under the MIT License - see the LICENSE file for details

## Acknowledgements

- [GSAP](https://greensock.com/gsap/) for animation capabilities
- [Framer Motion](https://www.framer.com/motion/) for component animations
- [Three.js](https://threejs.org/) for 3D elements
- Font families: [Orbitron](https://fonts.google.com/specimen/Orbitron), [Roboto Mono](https://fonts.google.com/specimen/Roboto+Mono), and [Space Grotesk](https://fonts.google.com/specimen/Space+Grotesk)
