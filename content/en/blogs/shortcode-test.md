---
title: "Testing New Image Shortcodes"
date: 2025-05-28T10:00:00-07:00
draft: false
---

{{< brick_wide >}}

# Testing the New Image Shortcodes

This is a test post to verify that our new image shortcodes are working correctly.

## Centered Image Test

Here's a centered image using the new `image` shortcode:

{{< image "uploads/branding/Profile_Photo_colour.jpg" "Profile Photo" >}}

## Panoramic Image Test

Here's a panoramic image using the new `imagepano` shortcode:

{{< imagepano alt="Mountain landscape" >}}
uploads/carousel/image1.jpg
{{< /imagepano >}}

## Quad Image Test

Here's a quad image layout using the new `imagequad` shortcode:

{{< imagequad alt="Collection of four images" >}}
uploads/carousel/image1.jpg
uploads/carousel/image2.jpg
uploads/carousel/image3.jpg
uploads/carousel/image4.jpg
{{< /imagequad >}}

## Offset Image Tests

### Image Left with Text Right

{{< imageleft "uploads/branding/Drakensberg_Enviro_Portrait.jpeg" "This is some text that will appear to the right of the image. It's a great way to describe the photo or add context. The image is positioned on the left side with a thin black border around the entire block." "Portrait in Drakensberg" >}}

### Image Right with Text Left

{{< imageright "uploads/GGiebelhauslogo200x200.png" "This text will be on the left side while the image is positioned on the right. The entire block has a thin black border frame as requested. This layout is perfect for alternating text and image positions in blog posts." "Logo" >}}

More content can go here...

{{< /brick_wide >}}
