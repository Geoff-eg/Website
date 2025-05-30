---
title: "Best Practices for Using Custom Shortcodes"
date: 2025-05-28T11:00:00-07:00
draft: false
description: "A comprehensive guide to using the new custom image shortcodes effectively in blog posts."
image: uploads/carousel/image1.jpg
tags:
  - blog
  - tutorial
  - shortcodes
---

{{< brick_wide >}}

# Best Practices for Using Custom Shortcodes

This post demonstrates the proper usage of our new custom image shortcodes and provides guidelines for creating accessible, well-structured content.

## Guidelines for Image Usage

When using our custom shortcodes, always remember these key principles:

1. **Always include alt text** - This is crucial for accessibility
2. **Use appropriate image sizes** - Optimize images before uploading
3. **Choose the right shortcode** - Match the shortcode to your content needs
4. **Test on mobile devices** - Ensure responsive behavior works correctly

## Shortcode Examples

### Centered Images
Use the centered image shortcode for standalone images that should be the focus of attention:

{{< image "uploads/branding/Profile_Photo_colour.jpg" "Professional portrait photograph" >}}

This shortcode is perfect for portrait photos, key illustrations, or any image that deserves center stage.

### Panoramic Views
For wide landscape photos or panoramic shots, use the panoramic shortcode:

{{< imagepano alt="Sweeping mountain landscape with dramatic sky" >}}
uploads/carousel/image1.jpg
{{< /imagepano >}}

**Tip:** Panoramic images support keyboard navigation (arrow keys) and touch gestures on mobile devices.

### Content with Supporting Images

#### Using Image Left Layout

{{< imageleft "uploads/branding/Drakensberg_Enviro_Portrait.jpeg" "When you want to discuss a specific topic while showing a related image, the image-left shortcode creates an elegant layout. The text flows naturally alongside the image, creating a professional magazine-style appearance. This layout works particularly well for biographical content, equipment reviews, or detailed explanations that benefit from visual support." "Environmental portrait in natural setting" >}}

#### Using Image Right Layout

{{< imageright "uploads/GGiebelhauslogo200x200.png" "Alternatively, you can position the image on the right side of your content. This creates visual variety when you have multiple image-text combinations in a single post. The consistent black border frames help define each section while maintaining visual cohesion throughout your content." "Company logo design" >}}

### Creating Visual Impact with Quad Layouts

For showcasing related images or creating visual stories, use the quad layout:

{{< imagequad alt="Collection showcasing photography equipment and techniques" >}}
uploads/carousel/image1.jpg
uploads/carousel/image2.jpg
uploads/carousel/image3.jpg
uploads/carousel/image4.jpg
{{< /imagequad >}}

This layout is excellent for:
- Before/after comparisons
- Step-by-step processes
- Equipment showcases
- Travel highlights

## Accessibility Best Practices

### Writing Effective Alt Text

Good alt text should:
- **Be descriptive but concise** (aim for 125 characters or less)
- **Describe the content and context** of the image
- **Avoid redundant phrases** like "image of" or "picture showing"
- **Include relevant details** that support your content

**Examples:**
- ❌ Poor: "Image"
- ❌ Poor: "Picture of mountains"
- ✅ Good: "Snow-capped mountain peaks at sunset with golden light"

### Keyboard Navigation

All our shortcodes support keyboard navigation:
- **Tab key** - Navigate between focusable elements
- **Arrow keys** - Pan panoramic images
- **Enter/Space** - Activate interactive elements

## Technical Considerations

### Image Optimization

Before uploading images:
1. **Resize appropriately** - Maximum width of 1920px for most uses
2. **Compress for web** - Balance quality and file size
3. **Use appropriate formats** - JPEG for photos, PNG for graphics with transparency
4. **Consider WebP format** - For modern browsers when possible

### Mobile Responsiveness

Our shortcodes automatically adapt to mobile devices:
- **Quad grids** become single columns on small screens
- **Offset layouts** stack vertically on mobile
- **Panoramic images** support touch gestures
- **All images** scale appropriately

## Performance Tips

### Loading Optimization
- Images load lazily by default
- Failed image loads are handled gracefully
- Performance monitoring is active in development

### Best Practices for Blog Posts
1. **Use headings hierarchically** (H1 → H2 → H3)
2. **Break up long text** with images and headings
3. **Include variety** in your shortcode usage
4. **Test before publishing** - Always preview your posts

## Conclusion

These shortcodes provide powerful tools for creating engaging, accessible content. Remember to:

- Prioritize accessibility with good alt text
- Choose the right shortcode for your content
- Optimize images before uploading
- Test your content on multiple devices

By following these guidelines, you'll create professional, accessible content that works well for all users.

{{< /brick_wide >}}
