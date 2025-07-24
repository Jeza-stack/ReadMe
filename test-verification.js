// Client-side testing verification script
// Add this to browser console to verify functionality

console.log('🧪 CEFR Excellence - Testing Verification Script');
console.log('===============================================');

// Test 1: Check if all required sections exist
const sections = ['home', 'levels', 'testimonials', 'assessment', 'contact'];
console.log('\n📍 Section Elements Check:');
sections.forEach(section => {
  const element = document.getElementById(section);
  console.log(`${section}: ${element ? '✅ Found' : '❌ Missing'}`);
});

// Test 2: Check navigation functionality
console.log('\n🧭 Navigation Elements Check:');
const navLinks = document.querySelectorAll('nav a[href^="#"]');
console.log(`Navigation links: ${navLinks.length > 0 ? '✅ Found ' + navLinks.length + ' links' : '❌ No nav links found'}`);

// Test 3: Check level cards
console.log('\n📋 Level Cards Check:');
const levelCards = document.querySelectorAll('.level-card');
console.log(`Level cards: ${levelCards.length === 6 ? '✅ All 6 levels found' : '❌ Expected 6, found ' + levelCards.length}`);

// Test 4: Check assessment form
console.log('\n📝 Assessment Form Check:');
const assessmentForm = document.querySelector('.assessment-form');
const formInputs = document.querySelectorAll('.assessment-form input, .assessment-form select, .assessment-form textarea');
console.log(`Assessment form: ${assessmentForm ? '✅ Found' : '❌ Missing'}`);
console.log(`Form inputs: ${formInputs.length >= 4 ? '✅ Found ' + formInputs.length + ' inputs' : '❌ Expected 4+, found ' + formInputs.length}`);

// Test 5: Check smooth scrolling
console.log('\n🎢 Smooth Scrolling Check:');
const smoothScrolling = getComputedStyle(document.documentElement).scrollBehavior;
console.log(`Smooth scrolling: ${smoothScrolling === 'smooth' ? '✅ Enabled' : '⚠️ May not be enabled'}`);

// Test 6: Check responsive classes
console.log('\n📱 Responsive Design Check:');
const responsiveElements = document.querySelectorAll('[class*="md:"], [class*="lg:"], [class*="sm:"]');
console.log(`Responsive classes: ${responsiveElements.length > 0 ? '✅ Found responsive utilities' : '❌ No responsive classes found'}`);

// Test 7: Check animations
console.log('\n✨ Animation Classes Check:');
const animatedElements = document.querySelectorAll('[class*="transition"], [class*="animate"], [class*="duration"]');
console.log(`Animation classes: ${animatedElements.length > 0 ? '✅ Found ' + animatedElements.length + ' animated elements' : '❌ No animations found'}`);

// Test 8: Check accessibility features
console.log('\n♿ Accessibility Check:');
const ariaLabels = document.querySelectorAll('[aria-label]');
const focusableElements = document.querySelectorAll('a, button, input, select, textarea');
console.log(`ARIA labels: ${ariaLabels.length > 0 ? '✅ Found ' + ariaLabels.length + ' labeled elements' : '⚠️ No ARIA labels found'}`);
console.log(`Focusable elements: ${focusableElements.length > 0 ? '✅ Found ' + focusableElements.length + ' focusable elements' : '❌ No focusable elements'}`);

// Test 9: Check for errors
console.log('\n🐛 Error Check:');
console.log('Check browser console for any errors after running this script.');

// Test 10: Performance check
console.log('\n⚡ Performance Info:');
if (performance && performance.navigation) {
  const loadTime = performance.navigation.loadEventEnd - performance.navigation.loadEventStart;
  console.log(`Page load time: ${loadTime}ms ${loadTime < 3000 ? '✅ Good' : '⚠️ Could be improved'}`);
}

console.log('\n🎯 Manual Testing Checklist:');
console.log('1. Click navigation links - should scroll smoothly');
console.log('2. Open mobile menu (if on mobile/small screen)');
console.log('3. Scroll down to see level card animations');
console.log('4. Fill out and submit assessment form');
console.log('5. Test keyboard navigation (Tab key)');
console.log('6. Resize window to test responsive design');
console.log('7. Check hover effects on buttons and cards');

console.log('\n✅ Verification script complete!');
console.log('Copy and paste this into your browser console while testing.');