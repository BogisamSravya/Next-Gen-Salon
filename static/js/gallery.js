/**
 * NEXT GEN - THE MEN'S HAIR & BEAUTY LOUNGES
 * Gallery Filter & Lightbox Viewer
 */

document.addEventListener('DOMContentLoaded', () => {
  initGalleryFilter();
  initLightbox();
});

function initGalleryFilter() {
  const filterTabs = document.querySelectorAll('.gallery-filter-tabs .filter-tab');
  const galleryItems = document.querySelectorAll('.gallery-grid .gallery-card');

  if (!filterTabs.length || !galleryItems.length) return;

  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filterCategory = tab.getAttribute('data-filter');

      galleryItems.forEach(item => {
        const itemCat = item.getAttribute('data-category');
        if (filterCategory === 'all' || itemCat === filterCategory) {
          item.style.display = 'block';
          item.style.animation = 'modal-enter 0.4s ease forwards';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
}

function initLightbox() {
  const lightbox = document.querySelector('.lightbox-modal');
  const lightboxImg = document.getElementById('lightboxImage');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const closeBtn = document.querySelector('.lightbox-close-btn');
  const cards = document.querySelectorAll('.gallery-card');

  if (!lightbox || !lightboxImg || !cards.length) return;

  cards.forEach(card => {
    card.addEventListener('click', () => {
      const img = card.querySelector('img');
      const title = card.querySelector('.gallery-card-title')?.childNodes[0]?.textContent.trim() || 'Next Gen Salon Gallery';

      if (img) {
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt || title;
        if (lightboxCaption) {
          lightboxCaption.textContent = title;
        }
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', closeLightbox);
  }

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
      closeLightbox();
    }
  });

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }
}
