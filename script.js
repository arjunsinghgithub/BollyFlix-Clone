// ===================================
// Mobile Menu Toggle
// ===================================
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const nav = document.querySelector('.nav');

if (mobileMenuToggle) {
  mobileMenuToggle.addEventListener('click', function() {
    const isExpanded = this.getAttribute('aria-expanded') === 'true';
    this.setAttribute('aria-expanded', !isExpanded);
    nav.classList.toggle('active');
    this.classList.toggle('active');
  });
}

// ===================================
// Scroll to Top Button
// ===================================
const scrollToTopBtn = document.getElementById('scrollToTopBtn');

// Show/hide button based on scroll position
function toggleScrollButton() {
  if (window.pageYOffset > 300) {
    scrollToTopBtn.classList.add('visible');
  } else {
    scrollToTopBtn.classList.remove('visible');
  }
}

// Scroll to top functionality
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

// Event listeners
window.addEventListener('scroll', toggleScrollButton);
if (scrollToTopBtn) {
  scrollToTopBtn.addEventListener('click', scrollToTop);
}

// ===================================
// Search Functionality
// ===================================
const searchForm = document.querySelector('.search-box form');
const searchInput = document.getElementById('search-input');

if (searchForm) {
  searchForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const searchTerm = searchInput.value.trim();
    
    if (searchTerm) {
      // Redirect to search page (modify URL as needed)
      window.location.href = `https://bollyflix.ist/?s=${encodeURIComponent(searchTerm)}`;
    }
  });
}

// ===================================
// Image Lazy Loading Fallback
// ===================================
// For browsers that don't support native lazy loading
if ('loading' in HTMLImageElement.prototype) {
  // Native lazy loading is supported
  console.log('Native lazy loading supported');
} else {
  // Fallback for older browsers
  const images = document.querySelectorAll('img[loading="lazy"]');
  
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src || img.src;
        img.classList.add('loaded');
        observer.unobserve(img);
      }
    });
  });
  
  images.forEach(img => imageObserver.observe(img));
}

// ===================================
// Enhanced Grid Item Interaction
// ===================================
const gridItems = document.querySelectorAll('.grid-item');

gridItems.forEach(item => {
  // Add keyboard navigation support
  item.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      const link = this.querySelector('a');
      if (link) {
        link.click();
      }
    }
  });
  
  // Optional: Add touch feedback for mobile
  item.addEventListener('touchstart', function() {
    this.style.transform = 'scale(0.98)';
  });
  
  item.addEventListener('touchend', function() {
    this.style.transform = '';
  });
});

// ===================================
// Smooth Scroll for Internal Links
// ===================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href !== '#') {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  });
});

// ===================================
// Navigation Active State
// ===================================
// Highlight current page in navigation (if URL matches)
const currentPath = window.location.pathname;
const navLinks = document.querySelectorAll('.nav a');

navLinks.forEach(link => {
  if (link.getAttribute('href') === currentPath) {
    link.classList.add('active');
    link.setAttribute('aria-current', 'page');
  }
});

// ===================================
// Loading State for Images
// ===================================
const imageElements = document.querySelectorAll('.grid-item img');

imageElements.forEach(img => {
  // Add loading class initially
  img.classList.add('loading');
  
  // Remove loading class when image loads
  img.addEventListener('load', function() {
    this.classList.remove('loading');
    this.classList.add('loaded');
  });
  
  // Handle image load errors
  img.addEventListener('error', function() {
    this.classList.remove('loading');
    this.classList.add('error');
    // Optional: Set a placeholder image
    // this.src = 'images/placeholder.jpg';
  });
});

// ===================================
// Pagination Enhancement
// ===================================
const paginationLinks = document.querySelectorAll('.pagination a');

paginationLinks.forEach(link => {
  link.addEventListener('click', function(e) {
    // Scroll to top when changing pages
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
});

// ===================================
// Service Worker Registration (Optional)
// ===================================
// Uncomment to enable offline functionality
/*
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('ServiceWorker registered:', registration);
      })
      .catch(error => {
        console.log('ServiceWorker registration failed:', error);
      });
  });
}
*/

// ===================================
// Performance Monitoring
// ===================================
// Log page load time
window.addEventListener('load', () => {
  if (window.performance && window.performance.timing) {
    const loadTime = window.performance.timing.loadEventEnd - window.performance.timing.navigationStart;
    console.log(`Page load time: ${loadTime}ms`);
  }
});

// ===================================
// Accessibility Enhancements
// ===================================
// Skip to main content link (add to HTML if needed)
const skipLink = document.querySelector('.skip-link');
if (skipLink) {
  skipLink.addEventListener('click', function(e) {
    e.preventDefault();
    const main = document.querySelector('.main');
    if (main) {
      main.setAttribute('tabindex', '-1');
      main.focus();
      main.scrollIntoView({ behavior: 'smooth' });
    }
  });
}

// ===================================
// Utility Functions
// ===================================

// Debounce function for performance
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Throttle function for scroll events
function throttle(func, limit) {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// Use throttled scroll for better performance
const throttledScroll = throttle(toggleScrollButton, 100);
window.addEventListener('scroll', throttledScroll);

// ===================================
// Initialize on DOM Ready
// ===================================
document.addEventListener('DOMContentLoaded', function() {
  console.log('BollyFlix website loaded successfully!');
  
  // Add loaded class to body
  document.body.classList.add('loaded');
  
  // Initialize any additional features here
});
