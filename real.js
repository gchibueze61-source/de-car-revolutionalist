/* ============================================================
   SCRIPT.JS — DE CAR REVOLUTIONALIST
   
   What this file handles:
   1. Hamburger menu toggle
   2. Navbar scroll shadow
   3. Active nav link highlighting
   4. Side nav dot highlighting based on scroll
   5. Gallery lightbox
   6. WhatsApp catalog button (mobile vs desktop)
   7. Scroll reveal animations
   
   NOTE: All Three.js / showroom code is in showroom.js
   This file only handles the website UI behaviour.
============================================================ */

document.addEventListener('DOMContentLoaded', () => {


  /* ----------------------------------------------------------
     1. HAMBURGER MENU
     
     When user clicks the ☰ button:
     - Toggle .active class on the nav ul
     - This makes the dropdown appear/disappear
     - Clicking a link also closes the menu
  ---------------------------------------------------------- */
  const menuToggle = document.getElementById('menu-toggle');
  const navLinks   = document.getElementById('nav-links');

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      /* Change icon to X when open, back to ☰ when closed */
      menuToggle.innerHTML = navLinks.classList.contains('active') ? '&times;' : '&#9776;';
    });

    /* Close menu when any nav link is clicked */
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        menuToggle.innerHTML = '&#9776;';
      });
    });
  }


  /* ----------------------------------------------------------
     2. NAVBAR SCROLL SHADOW
     
     When user scrolls down more than 20px:
     - Add .scrolled class to navbar
     - CSS applies a stronger shadow
  ---------------------------------------------------------- */
  const navbar = document.getElementById('navbar');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }, { passive: true });


  /* ----------------------------------------------------------
     3. ACTIVE NAV LINK + SIDE NAV DOT HIGHLIGHTING
     
     Uses IntersectionObserver to detect which section
     is currently visible. Then highlights the matching
     nav link and side dot.
     
     IntersectionObserver is like a sensor that fires
     when an element enters or leaves the viewport.
  ---------------------------------------------------------- */
  const sections    = document.querySelectorAll('section[id]');
  const topNavLinks = document.querySelectorAll('.navbar nav a');
  const sideDots    = document.querySelectorAll('.side-nav-dot');

  /* Helper: remove active from all, add to matching ones */
  function setActiveNav(id) {
    topNavLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
    });
    sideDots.forEach(dot => {
      dot.classList.toggle('active', dot.getAttribute('href') === `#${id}`);
    });
  }

  /* Observer: fires when section is 40% visible */
  const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        setActiveNav(entry.target.id);
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(section => sectionObserver.observe(section));


  /* ----------------------------------------------------------
     4. GALLERY LIGHTBOX
     
     When user clicks a gallery image:
     - Show the lightbox overlay
     - Set the lightbox image src to the clicked image
     
     When user clicks X or clicks outside image:
     - Hide the lightbox
  ---------------------------------------------------------- */
  const lightbox      = document.getElementById('lightbox');
  const lightboxImg   = document.getElementById('lightbox-img');
  const lightboxClose = document.getElementById('lightbox-close');
  const galleryItems  = document.querySelectorAll('.gallery-item');

  if (lightbox) {
    /* Open lightbox on image click */
    galleryItems.forEach(img => {
      img.addEventListener('click', () => {
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        lightbox.classList.add('open');
        document.body.style.overflow = 'hidden'; /* Prevent background scroll */
      });
    });

    /* Close on X button */
    lightboxClose.addEventListener('click', closeLightbox);

    /* Close on clicking the dark overlay (not the image itself) */
    lightbox.addEventListener('click', e => {
      if (e.target === lightbox) closeLightbox();
    });

    /* Close on Escape key */
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') closeLightbox();
    });

    function closeLightbox() {
      lightbox.classList.remove('open');
      document.body.style.overflow = ''; /* Restore scroll */
    }
  }


  /* ----------------------------------------------------------
     5. WHATSAPP CATALOG BUTTON
     
     On mobile: opens the WhatsApp catalog directly
     On desktop: opens a pre-filled WhatsApp chat message
     
     This is your original logic — completely unchanged
  ---------------------------------------------------------- */
  const consoleLink = document.getElementById('consoleLink');

  if (consoleLink) {
    const isMobile = /Android|iPhone|iPad|iPod|Opera Mini|IEMobile/i.test(navigator.userAgent);

    if (isMobile) {
      consoleLink.href = 'https://wa.me/c/2348166456295';
    } else {
      consoleLink.href = 'https://wa.me/2348166456295?text=Hello!%20I%20want%20to%20see%20your%20product%20catalog.';
    }
    consoleLink.target = '_blank';
    consoleLink.rel    = 'noopener noreferrer';
  }


  /* ----------------------------------------------------------
     6. SCROLL REVEAL ANIMATIONS
     
     Elements with class="reveal" are invisible by default.
     When they enter the viewport, add class="revealed"
     CSS transitions them into view smoothly.
  ---------------------------------------------------------- */
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        /* Stop observing after reveal — no need to re-trigger */
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealElements.forEach(el => revealObserver.observe(el));


}); /* End DOMContentLoaded */
/* ── AUTO UPDATE FOOTER YEAR ──
   Gets the current year from the user's device.
   Updates automatically every January 1st forever.
   No manual changes needed ever again.
*/
const footerYear = document.getElementById('footer-year');
if (footerYear) {
  footerYear.textContent = new Date().getFullYear();
}