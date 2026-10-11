/**
 * NEXT GEN - THE MEN'S HAIR & BEAUTY LOUNGES
 * Interactive Booking System & WhatsApp Link Generator
 */

document.addEventListener('DOMContentLoaded', () => {
  initBookingModal();
  initServiceFilter();
});

const SALON_PHONE_INTL = '918143148999'; // 081431 48999 formatted with India +91 code

function initBookingModal() {
  const modal = document.querySelector('.booking-modal');
  const openButtons = document.querySelectorAll('[data-open-booking]');
  const closeButton = document.querySelector('.modal-close-btn');
  const serviceSelect = document.getElementById('bookingService');
  const dateInput = document.getElementById('bookingDate');
  const bookingForm = document.getElementById('appointmentForm');

  if (!modal) return;

  // Set min date to today
  if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.min = today;
    dateInput.value = today;
  }

  // Open modal handler
  openButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const preselectedService = btn.getAttribute('data-service');
      if (preselectedService && serviceSelect) {
        serviceSelect.value = preselectedService;
      }
      openModal();
    });
  });

  // Close modal handler
  if (closeButton) {
    closeButton.addEventListener('click', closeModal);
  }

  // Close on outside overlay click
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Close on ESC key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });

  function openModal() {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  // Form submission -> Generate WhatsApp direct chat message
  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('bookingName')?.value.trim() || 'Client';
      const phone = document.getElementById('bookingPhone')?.value.trim() || 'Not specified';
      const service = document.getElementById('bookingService')?.value || 'General Consultation';
      const date = document.getElementById('bookingDate')?.value || 'Today';
      const time = document.getElementById('bookingTime')?.value || 'Flexible';
      const notes = document.getElementById('bookingNotes')?.value.trim() || 'None';

      const message = `Hello *Next Gen Salon (Penamaluru)*! 💈✨\n\nI would like to book an appointment:\n` +
        `👤 *Name:* ${name}\n` +
        `📞 *Contact:* ${phone}\n` +
        `✂️ *Service:* ${service}\n` +
        `📅 *Date:* ${date}\n` +
        `⏰ *Preferred Time:* ${time}\n` +
        (notes !== 'None' ? `📝 *Special Requests:* ${notes}\n\n` : '\n') +
        `Please confirm my booking slot. Thank you!`;

      const encodedMessage = encodeURIComponent(message);
      const whatsappUrl = `https://wa.me/${SALON_PHONE_INTL}?text=${encodedMessage}`;

      // Open WhatsApp in new window
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
      closeModal();
    });
  }
}

/**
 * Interactive Service Filter Tabs
 */
function initServiceFilter() {
  const filterTabs = document.querySelectorAll('.services-filter-tabs .filter-tab');
  const serviceCards = document.querySelectorAll('.services-grid .service-card');

  if (!filterTabs.length || !serviceCards.length) return;

  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Remove active from all tabs
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filterValue = tab.getAttribute('data-filter');

      serviceCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (filterValue === 'all' || cardCategory === filterValue) {
          card.style.display = 'flex';
          card.style.animation = 'modal-enter 0.4s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}
