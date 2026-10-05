console.log("Portfolio Connected");

/// ===========================
// GRAB ELEMENTS
// ===========================
const navLinks     = document.querySelectorAll('.nav-links a');
const sections     = document.querySelectorAll('section');
const skillFills   = document.querySelectorAll('.skill-fill');
const fadeElements = document.querySelectorAll('.fade-in');
const footer       = document.querySelector('.footer');

// ===========================
// SHOW PAGE FUNCTION
// ===========================
function showPage(targetId) {

  // Step 1 — Hide all sections
  sections.forEach(function(section) {
    section.classList.remove('active-page');
    section.style.opacity = '0';
  });

  // Step 2 — Hide footer
  footer.classList.remove('active-page');

  // Step 3 — Remove active from all nav links
  navLinks.forEach(function(link) {
    link.classList.remove('active');
  });

  // Step 4 — Reset fade-in elements
  fadeElements.forEach(function(element) {
    element.classList.remove('visible');
  });

  // Step 5 — Show target section
  const targetSection = document.getElementById(targetId);

  if (targetSection) {
    targetSection.classList.add('active-page');

    // Show footer only on contact page
    if (targetId === 'contact') {
      footer.classList.add('active-page');
    }

    // Fade in after small delay
    setTimeout(function() {
      targetSection.style.opacity = '1';
      triggerFadeIn();
    }, 50);
  }

  // Step 6 — Add active to matching nav link
  navLinks.forEach(function(link) {
    if (link.getAttribute('href') === '#' + targetId) {
      link.classList.add('active');
    }
  });

  // Step 7 — Animate skill bars if skills page
  if (targetId === 'skills') {
    setTimeout(function() {
      animateSkillBars();
    }, 200);
  }

  // Step 8 — Scroll page content to top
  window.scrollTo(0, 0);
  localStorage.setItem('currentPage', targetId); // ← ADD THIS
}

// ===========================
// NAV LINK CLICK
// ===========================
navLinks.forEach(function(link) {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href').replace('#', '');
    showPage(targetId);
  });
});

// ===========================
// HERO BUTTON — VIEW PROJECTS
// ===========================
document.querySelector('.btn-primary').addEventListener('click', function(e) {
  const href = this.getAttribute('href');
  if (href === '#projects') {
    e.preventDefault();
    showPage('projects');
  }
});

// ===========================
// SKILL BAR ANIMATION
// ===========================
let skillsAnimated = false;

function animateSkillBars() {
  if (skillsAnimated) return;

  skillFills.forEach(function(fill) {
    const targetWidth = fill.getAttribute('data-width');
    fill.style.width  = '0%';

    setTimeout(function() {
      fill.style.width = targetWidth;
    }, 100);
  });

  skillsAnimated = true;
}

// ===========================
// FADE IN ANIMATION
// ===========================
function triggerFadeIn() {
  fadeElements.forEach(function(element) {
    element.classList.add('visible');
  });
}

// ===========================
// RUN ON PAGE LOAD
// ===========================
const lastPage = localStorage.getItem('currentPage') || 'hero';
showPage(lastPage);