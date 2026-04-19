# Logo Setup Guide

## Logo Size Updates

The logo has been made **larger and more visible** throughout the website:

### Header Logo
- **Size**: Increased from 40px to **48px (h-12)** height
- **Visibility**: Added drop-shadow for better visibility when transparent
- **Color**: White when navbar is transparent, dark when scrolled
- **Auto-fallback**: SVG with PNG fallback

### Footer Logo
- **Size**: 40px (h-10) height
- **Color**: White (inverted)
- **Replaces**: Previous text-based logo

### Preloader Logo
- **Size**: Increased from 80px to **96px (h-24)** height
- **Position**: Centered on loading screen
- **Animation**: Smooth fade-in and scale

### Favicon
- **Updated**: Now uses actual logo files
- **Formats**: .ico, 16x16.png, 32x32.png
- **Apple Touch Icon**: For iOS devices

## Copy Logo Files

Copy these files from RajuPathak project to Samay Innovation:

**Source:** `/Users/vaghela.arvindbhai/Documents/My Projects/RajuPathak/public/images/logo/`

**Destination:** `samay-innovation/samay-innovation/public/logo/`

### Files to Copy:
- `logo.svg` - Main logo (SVG format - best for web)
- `logo.png` - Main logo (PNG format - fallback)
- `full-logo.svg` - Full logo with text (SVG)
- `full-logo.png` - Full logo with text (PNG)
- `favicon.ico` - Browser tab icon ⭐
- `favicon-16x16.png` - Small favicon ⭐
- `favicon-32x32.png` - Medium favicon ⭐

## Terminal Command to Copy:

```bash
# Navigate to your Samay Innovation project
cd "/Users/vaghela.arvindbhai/Documents/My Projects/samay-innovation/samay-innovation"

# Create logo directory
mkdir -p public/logo

# Copy all logo files
cp "/Users/vaghela.arvindbhai/Documents/My Projects/RajuPathak/public/images/logo/"* public/logo/
```

## Logo Visibility Enhancements

### 1. Header (Navbar)
- Larger size for better visibility
- Drop-shadow effect when transparent
- Smooth color transition on scroll
- Responsive sizing on mobile

### 2. Footer
- Clean white logo on dark background
- Proper sizing and spacing
- Replaces text-based branding

### 3. Loading Screen
- Prominent logo display
- Professional first impression
- Smooth animations

### 4. Browser Tab (Favicon)
- Multiple sizes for different devices
- Proper .ico format for compatibility
- Apple touch icon for iOS

## After Copying

The logo will be accessible at:
- `/logo/logo.svg` - Main logo
- `/logo/logo.png` - PNG fallback
- `/logo/favicon.ico` - Browser icon
- `/logo/favicon-16x16.png` - Small icon
- `/logo/favicon-32x32.png` - Medium icon

## SEO Improvements

The index.html has also been updated with:
- Proper meta descriptions
- Keywords for SEO
- Better page title
- Favicon links

## Troubleshooting

### Logo not showing?
1. Make sure files are copied to `public/logo/` folder
2. Check file names match exactly (case-sensitive)
3. Restart dev server: `npm run dev`
4. Clear browser cache (Ctrl+Shift+R or Cmd+Shift+R)

### Logo too thin/small?
The logo size has been increased to:
- Header: 48px (h-12)
- Footer: 40px (h-10)
- Preloader: 96px (h-24)

If you need it even larger, edit these files:
- `src/components/layout/Header.tsx` - Change `h-12` to `h-14` or `h-16`
- `src/components/layout/Footer.tsx` - Change `h-10` to `h-12`
- `src/components/ui/Preloader.tsx` - Change `h-24` to `h-28` or `h-32`

### Favicon not updating?
1. Clear browser cache completely
2. Hard refresh (Ctrl+Shift+R)
3. Close and reopen browser
4. Check `public/logo/` folder has favicon files

## Logo Specifications

For best results:
- **Format**: SVG (vector) preferred, PNG as fallback
- **Background**: Transparent
- **Colors**: Should work on both light and dark backgrounds
- **Size**: Vector (SVG) scales perfectly, PNG should be at least 200x200px

## Mobile Optimization

Logo automatically adjusts on mobile:
- Slightly smaller on mobile devices
- Maintains aspect ratio
- Touch-friendly spacing
- Fast loading

## Dark Mode Support

Logo automatically adapts:
- **Light mode**: Dark logo
- **Dark mode**: Light logo (inverted)
- **Transparent navbar**: White logo with shadow
- **Scrolled navbar**: Adapts to background

The code has been updated to use these local paths automatically!
