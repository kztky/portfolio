/* ==========================================
   Tag Filter
   ========================================== */
(function () {
  const filterBtns = document.querySelectorAll('.tag-btn');
  const workCards = document.querySelectorAll('.work-card[data-tags]');
  const categories = document.querySelectorAll('.work-category');

  if (!filterBtns.length) return;

  function applyFilter(tag) {
    // Update button states
    filterBtns.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.tag === tag);
      btn.setAttribute('aria-pressed', btn.dataset.tag === tag ? 'true' : 'false');
    });

    // Show/hide cards
    workCards.forEach(card => {
      if (tag === 'all') {
        card.classList.remove('hidden');
      } else {
        const cardTags = (card.dataset.tags || '').split(' ').filter(Boolean);
        card.classList.toggle('hidden', !cardTags.includes(tag));
      }
    });

    // Hide/show empty categories
    categories.forEach(cat => {
      const visible = cat.querySelectorAll('.work-card:not(.hidden)');
      cat.style.display = visible.length === 0 ? 'none' : '';
    });
  }

  // Filter button clicks
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => applyFilter(btn.dataset.tag));
  });

  // Tag chip clicks inside cards
  document.querySelectorAll('.tag-chip[data-tag]').forEach(chip => {
    chip.addEventListener('click', () => {
      applyFilter(chip.dataset.tag);
      // Scroll tag filter into view
      const filterEl = document.querySelector('.tag-filter');
      if (filterEl) {
        filterEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    });
  });

  // Initialize
  applyFilter('all');
})();

/* ==========================================
   Active Nav Link on Scroll
   ========================================== */
(function () {
  const sections = document.querySelectorAll('.section[id]');
  const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

  if (!sections.length || !navLinks.length) return;

  const navH = parseInt(getComputedStyle(document.documentElement)
    .getPropertyValue('--nav-h')) || 52;

  function onScroll() {
    let current = '';
    sections.forEach(sec => {
      const top = sec.getBoundingClientRect().top;
      if (top <= navH + 4) current = sec.id;
    });

    navLinks.forEach(link => {
      const href = link.getAttribute('href').replace('#', '');
      link.style.opacity = href === current ? '1' : '';
      link.style.color = href === current ? 'var(--hover)' : '';
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

(function () {
  document.addEventListener('DOMContentLoaded', function () {
    const sections = document.querySelectorAll('.section');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const label = entry.target.querySelector('.section-label');
        if (!label) return;
        if (entry.isIntersecting) {
          label.classList.add('active');
        } else {
          label.classList.remove('active');
        }
      });
    }, { threshold: 0.3 });

    sections.forEach(section => observer.observe(section));
  });
})();
