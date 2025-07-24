'use client';

import { useEffect } from 'react';

export function GlobalScripts() {
  useEffect(() => {
    // Enhanced smooth scrolling for all anchor links
    const handleSmoothScroll = (e: Event) => {
      const target = e.target as HTMLAnchorElement;
      if (target.tagName === 'A' && target.getAttribute('href')?.startsWith('#')) {
        e.preventDefault();
        const targetId = target.getAttribute('href');
        const targetElement = targetId ? document.querySelector(targetId) : null;
        
        if (targetElement) {
          const headerOffset = 80; // Account for fixed header
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }
    };

    // Add click listeners to all anchor links
    document.addEventListener('click', handleSmoothScroll);

    // Add scroll-to-top functionality
    const addScrollToTopButton = () => {
      // Create scroll to top button
      const scrollButton = document.createElement('button');
      scrollButton.innerHTML = '↑';
      scrollButton.className = 'fixed bottom-8 right-8 w-12 h-12 bg-primary text-primary-foreground rounded-full shadow-lg opacity-0 transition-all duration-300 hover:scale-110 z-50';
      scrollButton.style.visibility = 'hidden';
      scrollButton.setAttribute('aria-label', 'Scroll to top');
      
      // Add to page
      document.body.appendChild(scrollButton);

      // Show/hide button based on scroll position
      const toggleScrollButton = () => {
        if (window.pageYOffset > 300) {
          scrollButton.style.visibility = 'visible';
          scrollButton.style.opacity = '1';
        } else {
          scrollButton.style.opacity = '0';
          setTimeout(() => {
            if (scrollButton.style.opacity === '0') {
              scrollButton.style.visibility = 'hidden';
            }
          }, 300);
        }
      };

      // Scroll to top when clicked
      scrollButton.addEventListener('click', () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      });

      // Listen for scroll events
      window.addEventListener('scroll', toggleScrollButton);

      // Cleanup function
      return () => {
        document.body.removeChild(scrollButton);
        window.removeEventListener('scroll', toggleScrollButton);
      };
    };

    // Initialize scroll to top button
    const cleanupScrollButton = addScrollToTopButton();

    // Add keyboard navigation for accessibility
    const handleKeyboardNavigation = (e: KeyboardEvent) => {
      // Escape key to close mobile menus
      if (e.key === 'Escape') {
        const mobileMenuButtons = document.querySelectorAll('[aria-label="Toggle menu"]');
        mobileMenuButtons.forEach(button => {
          const buttonElement = button as HTMLButtonElement;
          if (buttonElement.getAttribute('aria-expanded') === 'true') {
            buttonElement.click();
          }
        });
      }

      // Tab navigation enhancement
      if (e.key === 'Tab') {
        // Add focus visible class for keyboard users
        document.body.classList.add('keyboard-focus');
      }
    };

    // Remove focus visible class on mouse interaction
    const handleMouseDown = () => {
      document.body.classList.remove('keyboard-focus');
    };

    // Add event listeners
    document.addEventListener('keydown', handleKeyboardNavigation);
    document.addEventListener('mousedown', handleMouseDown);

    // Cleanup function
    return () => {
      document.removeEventListener('click', handleSmoothScroll);
      document.removeEventListener('keydown', handleKeyboardNavigation);
      document.removeEventListener('mousedown', handleMouseDown);
      cleanupScrollButton();
    };
  }, []);

  // Add global styles for keyboard focus
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      /* Enhanced focus styles for keyboard users */
      .keyboard-focus *:focus {
        outline: 2px solid #2563eb !important;
        outline-offset: 2px !important;
      }
      
      /* Hide focus outline for mouse users */
      body:not(.keyboard-focus) *:focus {
        outline: none !important;
      }
      
      /* Smooth focus transitions */
      a, button, input, select, textarea {
        transition: outline 0.2s ease-in-out;
      }
      
      /* Enhanced button hover effects */
      button:hover {
        transform: translateY(-1px);
      }
      
      /* Loading state for forms */
      .form-loading {
        pointer-events: none;
        opacity: 0.7;
      }
      
      .form-loading::after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: 20px;
        height: 20px;
        margin: -10px 0 0 -10px;
        border: 2px solid #ccc;
        border-top-color: #007bff;
        border-radius: 50%;
        animation: spin 1s linear infinite;
      }
      
      @keyframes spin {
        to { transform: rotate(360deg); }
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return null; // This component doesn't render anything
}