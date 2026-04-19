# Hero Images Setup Guide

## Current Image Links (Download These)

Here are the 4 hero images currently being used:

1. **Hero Image 1**: https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=2560&h=1440&fit=crop
2. **Hero Image 2**: https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=2560&h=1440&fit=crop
3. **Hero Image 3**: https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=2560&h=1440&fit=crop
4. **Hero Image 4**: https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=2560&h=1440&fit=crop

## How to Download

1. Open each link in your browser
2. Right-click on the image and select "Save Image As..."
3. Save them with these names:
   - `hero-1.jpg`
   - `hero-2.jpg`
   - `hero-3.jpg`
   - `hero-4.jpg`

## Where to Place the Images

Place your downloaded images in this folder structure:

```
samay-innovation/
└── samay-innovation/
    └── public/
        └── assets/
            └── images/
                └── hero/
                    ├── hero-1.jpg
                    ├── hero-2.jpg
                    ├── hero-3.jpg
                    └── hero-4.jpg
```

## Steps to Create the Folder Structure

1. Navigate to: `samay-innovation/samay-innovation/public/`
2. Create folder: `assets` (if it doesn't exist)
3. Inside `assets`, create folder: `images`
4. Inside `images`, create folder: `hero`
5. Place your 4 downloaded images in the `hero` folder

## Image Specifications

For best results, your hero images should be:
- **Resolution**: 2560x1440 pixels (or similar 16:9 ratio)
- **Format**: JPG or PNG
- **File Size**: Optimized (under 500KB each for faster loading)
- **Content**: High-quality interior design photos

## Already Updated in Code

The Hero component (`src/components/sections/Hero.tsx`) has been updated to use these local paths:

```typescript
const defaultImages = [
  '/assets/images/hero/hero-1.jpg',
  '/assets/images/hero/hero-2.jpg',
  '/assets/images/hero/hero-3.jpg',
];
```

## Using Your Own Images

To use your own images instead:

1. Place your images in `public/assets/images/hero/`
2. Name them `hero-1.jpg`, `hero-2.jpg`, etc.
3. Or update the paths in `src/components/sections/Hero.tsx`

## Alternative: Keep Using External URLs

If you prefer to keep using external URLs (like Unsplash), you can pass custom images to the Hero component in `src/pages/Home.tsx`:

```typescript
<Hero 
  height="full"
  images={[
    'https://your-image-url-1.jpg',
    'https://your-image-url-2.jpg',
    'https://your-image-url-3.jpg',
    'https://your-image-url-4.jpg',
  ]}
/>
```

## Notes

- Images in the `public` folder are served directly and don't need to be imported
- The path starts with `/` which refers to the `public` folder
- Make sure image names match exactly (case-sensitive)
- After adding images, you may need to restart the dev server
