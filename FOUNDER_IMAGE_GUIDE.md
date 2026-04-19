# Founder Image Setup Guide

## Founder Section Added to About Page

A beautiful, professional founder section has been added to the About Us page with:
- Large portrait image (3:4 aspect ratio)
- Decorative quote box
- Founder name and title
- Detailed biography
- Key achievements with statistics
- Education and certifications

## Where to Place Founder Image

Create this folder structure:

```
samay-innovation/samay-innovation/public/assets/images/founder/
└── founder.jpg
```

## Image Specifications

For best results, the founder's image should be:
- **Aspect Ratio**: 3:4 (portrait orientation)
- **Recommended Size**: 600x800 pixels or 900x1200 pixels
- **Format**: JPG or PNG
- **File Size**: Under 300KB (optimized)
- **Style**: Professional portrait, good lighting, neutral or office background

## Steps to Add Image

1. **Create the folder:**
```bash
cd "/Users/vaghela.arvindbhai/Documents/My Projects/samay-innovation/samay-innovation"
mkdir -p public/assets/images/founder
```

2. **Add your founder's image:**
   - Name it `founder.jpg` or `founder.png`
   - Place it in `public/assets/images/founder/`

3. **Update the code path if using PNG:**
   Edit `src/pages/About.tsx` line with the image:
   ```typescript
   src="/assets/images/founder/founder.png"  // Change .jpg to .png if needed
   ```

## Content to Update

Replace the placeholder text in `src/pages/About.tsx`:

### 1. Founder Name
```typescript
<h4 className="text-3xl md:text-4xl font-light...">
  [Founder Name]  // Replace with actual name
</h4>
```

### 2. Biography
Update the three paragraphs with actual founder information:
- Years of experience
- Background and expertise
- Vision and philosophy
- Notable achievements

### 3. Statistics
Update the achievement numbers:
```typescript
<p className="text-2xl font-light text-accent-primary mb-1">[X]+</p>
```
Replace `[X]` with actual numbers:
- Projects Completed
- Years Experience
- Happy Clients

### 4. Education & Certifications
Replace placeholder entries with actual qualifications:
```typescript
<span>[Degree/Certification Name] - [Institution]</span>
```

### 5. Quote (Optional)
Update the decorative quote box with founder's actual quote:
```typescript
<p className="text-sm font-light text-white leading-relaxed">
  "Design is not just what it looks like, it's how it makes you feel."
</p>
```

## Design Features

The founder section includes:

1. **Professional Layout**
   - 2-column grid (image left, content right)
   - Responsive design (stacks on mobile)
   - Elegant spacing and typography

2. **Visual Elements**
   - Large portrait image with 3:4 aspect ratio
   - Gold decorative quote box overlapping image
   - Section header with circular icon
   - Divider lines for content sections

3. **Content Sections**
   - Name and title
   - Detailed biography (3 paragraphs)
   - Key achievements grid (4 statistics)
   - Education and certifications list

4. **Animations**
   - Smooth fade-in and slide animations
   - Staggered entrance for image and content
   - Scroll-triggered animations

## Example Content Structure

```
FOUNDER SECTION
├── Image (Left)
│   ├── Portrait photo (3:4 ratio)
│   └── Quote box (overlapping bottom-right)
│
└── Content (Right)
    ├── Name & Title
    ├── Biography (3 paragraphs)
    ├── Achievements (4 statistics)
    └── Education (3-5 items)
```

## Tips for Best Results

1. **Professional Photo**
   - Use a high-quality, professional headshot
   - Good lighting and clear background
   - Confident, approachable expression
   - Business casual or formal attire

2. **Biography Writing**
   - Keep it personal yet professional
   - Highlight unique expertise
   - Include passion and vision
   - Mention awards and recognition

3. **Statistics**
   - Use real, impressive numbers
   - Round up for impact (e.g., "50+" instead of "47")
   - Include only verifiable achievements

4. **Education**
   - List most relevant qualifications
   - Include prestigious institutions
   - Add certifications and memberships
   - Keep it concise (3-5 items max)

## Fallback Image

If no founder image is provided, the section will automatically use a placeholder image from Unsplash. However, for best results, always use an actual founder photo.

## Mobile Optimization

The section is fully responsive:
- Image and content stack vertically on mobile
- Quote box adjusts position
- Statistics grid becomes single column
- Text sizes scale appropriately

## Location in About Page

The Founder section appears:
1. After "Our Story" section
2. Before "Our Approach" section
3. Approximately middle of the About page

This placement ensures good visibility while maintaining page flow.
