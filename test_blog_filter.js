// Test script to verify blog filtering works correctly
// This script can be run in the browser console

function testBlogFiltering() {
    console.log('=== Blog Filter Test ===');
    
    // Get all blog posts
    const allPosts = document.querySelectorAll('.contentitems > li:not(.placeholder)');
    console.log('Total blog posts found:', allPosts.length);
    
    // Test: Find posts with 'blog' tag
    const blogPosts = document.querySelectorAll('.contentitems > li.tag_blog');
    console.log('Posts with "blog" tag:', blogPosts.length);
    
    // Test: Find posts with 'film' tag  
    const filmPosts = document.querySelectorAll('.contentitems > li.tag_Film, .contentitems > li.tag_film');
    console.log('Posts with "film" tag:', filmPosts.length);
    
    // Test: Find posts with 'shortcodes' tag
    const shortcodePosts = document.querySelectorAll('.contentitems > li.tag_shortcodes');
    console.log('Posts with "shortcodes" tag:', shortcodePosts.length);
    
    // Test CSS selector validity for all tags
    const filterOptions = document.querySelectorAll('#filter option');
    let invalidSelectors = [];
    
    filterOptions.forEach(option => {
        const tagValue = option.value;
        if (tagValue) {
            try {
                const selector = '.contentitems > li.tag_' + tagValue;
                document.querySelectorAll(selector);
                console.log('✓ Valid selector:', selector);
            } catch (error) {
                invalidSelectors.push(tagValue);
                console.error('✗ Invalid selector for tag:', tagValue, error.message);
            }
        }
    });
    
    if (invalidSelectors.length === 0) {
        console.log('🎉 All tag selectors are valid! Filtering should work correctly.');
    } else {
        console.log('❌ Found invalid selectors:', invalidSelectors);
    }
    
    return {
        totalPosts: allPosts.length,
        blogPosts: blogPosts.length,
        filmPosts: filmPosts.length,
        shortcodePosts: shortcodePosts.length,
        invalidSelectors: invalidSelectors
    };
}

// Instructions for manual testing:
console.log('To test filtering:');
console.log('1. Open http://localhost:1313/blogs/ in your browser');
console.log('2. Open browser console (F12)');
console.log('3. Copy and paste this script');
console.log('4. Run: testBlogFiltering()');
console.log('5. Try selecting tags from the dropdown to see filtering in action');
