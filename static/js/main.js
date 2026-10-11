/**
 * NEXT GEN - THE MEN'S HAIR & BEAUTY LOUNGES
 * Main Application Logic
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initDynamicBusinessStatus();
  initScrollAnimations();
  initBackToTop();
  if (window.lucide) {
    window.lucide.createIcons();
  }
});

/**
 * Sticky Navbar & Mobile Drawer
 */
function initNavbar() {
  const header = document.querySelector('.header');
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  // Sticky navbar with blur on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    updateActiveNavLink();
  });

  // Mobile hamburger menu toggle
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      mobileToggle.classList.toggle('active');
      mobileToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close menu when clicking any nav link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        mobileToggle.classList.remove('active');
        mobileToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  // Active link highlighter based on scroll position
  function updateActiveNavLink() {
    const scrollPos = window.scrollY + 120;
    const sections = document.querySelectorAll('section[id]');

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }
}

/**
 * Real-time Dynamic Salon Business Status
 * Operating Hours: 9:00 AM - 10:00 PM
 */
function initDynamicBusinessStatus() {
  const statusElements = document.querySelectorAll('.dynamic-status-pill');
  if (!statusElements.length) return;

  function checkStatus() {
    // Current time in IST (Indian Standard Time UTC+5:30)
    const now = new Date();
    const utcTime = now.getTime() + (now.getTimezoneOffset() * 60000);
    const istOffset = 5.5 * 3600000;
    const istDate = new Date(utcTime + istOffset);

    const hours = istDate.getHours();
    const minutes = istDate.getMinutes();
    const currentDecimal = hours + (minutes / 60);

    // Salon opens at 9:00 (9.0) and closes at 22:00 (22.0)
    const isOpen = currentDecimal >= 9.0 && currentDecimal < 22.0;

    statusElements.forEach(el => {
      const textSpan = el.querySelector('.status-text');
      if (isOpen) {
        el.className = 'live-indicator dynamic-status-pill';
        if (textSpan) {
          textSpan.textContent = 'Open Now • Closes at 10 PM';
        }
      } else {
        el.className = 'live-indicator closed dynamic-status-pill';
        if (textSpan) {
          textSpan.textContent = 'Closed Now • Opens at 9 AM';
        }
      }
    });
  }

  checkStatus();
  // Refresh every 2 minutes
  setInterval(checkStatus, 120000);
}

/**
 * Scroll Reveal Animations via Intersection Observer
 */
function initScrollAnimations() {
  const revealItems = document.querySelectorAll('.reveal-on-scroll');
  if (!revealItems.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-visible');
        obs.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    rootMargin: '0px 0px -50px 0px',
    threshold: 0.12
  });

  revealItems.forEach(item => {
    item.classList.add('reveal-init');
    observer.observe(item);
  });
}

/**
 * Back to Top Button
 */
function initBackToTop() {
  const backToTopBtn = document.querySelector('.back-to-top-btn');
  if (!backToTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}
