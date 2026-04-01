/* ═══════════════════════════════════════
   DEVI KALYANA MANDAPAM — MAIN JS
   ═══════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── NAV SCROLL SHADOW ── */
  const navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 20);
    });
  }

  /* ── ACTIVE NAV LINK ── */
  const currentPath = window.location.pathname;
  document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(link => {
    const href = link.getAttribute('href');
    if (href && currentPath.includes(href.replace('../', '').replace('index.html', '')) && href !== '#') {
      link.classList.add('active');
    }
  });

  /* ── HAMBURGER MENU ── */
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      mobileMenu.classList.toggle('open');
    });
  }

  /* ── CLOSE MOBILE MENU ON LINK CLICK ── */
  document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => {
      if (mobileMenu) mobileMenu.classList.remove('open');
    });
  });

  /* ── SCROLL REVEAL ── */
  const reveals = document.querySelectorAll('.reveal');
  if (reveals.length) {
    const revealObs = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add('visible'), i * 70);
          revealObs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    reveals.forEach(el => revealObs.observe(el));
  }

  /* ── CONTACT FORM SUBMIT ── */
  const enquiryForm = document.getElementById('enquiryForm');
  if (enquiryForm) {
    enquiryForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = enquiryForm.querySelector('.btn-submit');

  btn.textContent = 'Sending…';
  btn.disabled = true;

  emailjs.sendForm("service_pbu4r2k", "template_6rin8ol", e.target)
    .then(() => {
      btn.textContent = '✓ Enquiry Sent! We\'ll call you shortly.';
      btn.style.background = 'var(--gold-dark)';
    })
    .catch(() => {
      btn.textContent = 'Something went wrong. Please call us.';
      btn.disabled = false;
     
    });
     console.log('Enquiry form submitted'); // For debugging, can be removed in production
  })
  };
  /* ── FAQ ACCORDION ── */
  document.querySelectorAll('.faq-q').forEach(q => {
    q.addEventListener('click', () => {
      const item = q.closest('.faq-item');
      const isOpen = item.classList.contains('open');
      // close all
      document.querySelectorAll('.faq-item').forEach(f => f.classList.remove('open'));
      // open clicked if it was closed
      if (!isOpen) item.classList.add('open');
    });
  });

  /* ── GALLERY LIGHTBOX ── */
  const lightbox    = document.getElementById('lightbox');
  const lbImg       = document.getElementById('lbImg');
  const lbClose     = document.getElementById('lbClose');
  const lbPrev      = document.getElementById('lbPrev');
  const lbNext      = document.getElementById('lbNext');
  const galleryImgs = document.querySelectorAll('.gallery-full-item img, .g-item img');
  let currentIdx = 0;

  if (lightbox && lbImg) {
    const imgArr = Array.from(galleryImgs);

    function openLightbox(idx) {
      currentIdx = idx;
      lbImg.src = imgArr[idx].src;
      lbImg.alt = imgArr[idx].alt;
      lightbox.classList.add('open');
      document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
      lightbox.classList.remove('open');
      document.body.style.overflow = '';
    }

    imgArr.forEach((img, idx) => {
      img.parentElement.addEventListener('click', () => openLightbox(idx));
    });

    lbClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });

    if (lbPrev) {
      lbPrev.addEventListener('click', () => {
        currentIdx = (currentIdx - 1 + imgArr.length) % imgArr.length;
        lbImg.src = imgArr[currentIdx].src;
        lbImg.alt = imgArr[currentIdx].alt;
      });
    }
    if (lbNext) {
      lbNext.addEventListener('click', () => {
        currentIdx = (currentIdx + 1) % imgArr.length;
        lbImg.src = imgArr[currentIdx].src;
        lbImg.alt = imgArr[currentIdx].alt;
      });
    }

    document.addEventListener('keydown', e => {
      if (!lightbox.classList.contains('open')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft' && lbPrev) lbPrev.click();
      if (e.key === 'ArrowRight' && lbNext) lbNext.click();
    });
  }

  /* ── BLOG FILTER ── */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const blogCards  = document.querySelectorAll('.blog-card[data-cat]');

  if (filterBtns.length && blogCards.length) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const cat = btn.dataset.cat;
        blogCards.forEach(card => {
          if (cat === 'all' || card.dataset.cat === cat) {
            card.style.display = '';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

});
// Auto-update copyright year everywhere
document.addEventListener('DOMContentLoaded', () => {
  const currentYear = new Date().getFullYear();
 
  // Update all elements with class "current-year"
  document.querySelectorAll('.current-year').forEach(el => {
    el.textContent = currentYear;
  });

  if ('loading' in HTMLImageElement.prototype) {
  // Browser supports native lazy loading — nothing to do
} else {
  // Fallback for old browsers — dynamically load a polyfill
  const script = document.createElement('script');
  script.src = 'https://cdn.jsdelivr.net/npm/loading-attribute-polyfill@2/dist/loading-attribute-polyfill.umd.js';
  document.body.appendChild(script);
}
});
