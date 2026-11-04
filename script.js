console.log("Portfolio Connected");

// ===========================
// GRAB ELEMENTS
// ===========================
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section');
const fadeElements = document.querySelectorAll('.fade-in');
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navLinksContainer = document.querySelector('.nav-links');

// ===========================
// MOBILE MENU TOGGLE
// ===========================
if (mobileMenuToggle) {
  mobileMenuToggle.addEventListener('click', function() {
    this.classList.toggle('active');
    navLinksContainer.classList.toggle('active');
    document.body.style.overflow = navLinksContainer.classList.contains('active') ? 'hidden' : '';
  });
}

// ===========================
// SMOOTH SCROLL WITH ACTIVE LINK
// ===========================
navLinks.forEach(function(link) {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href').replace('#', '');
    const targetSection = document.getElementById(targetId);
    
    if (targetSection) {
      targetSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
      
      // Close mobile menu after clicking
      if (mobileMenuToggle && navLinksContainer.classList.contains('active')) {
        mobileMenuToggle.classList.remove('active');
        navLinksContainer.classList.remove('active');
        document.body.style.overflow = '';
      }
    }
  });
});

// Close mobile menu when clicking outside
document.addEventListener('click', function(e) {
  if (mobileMenuToggle && 
      !e.target.closest('.navbar') && 
      navLinksContainer.classList.contains('active')) {
    mobileMenuToggle.classList.remove('active');
    navLinksContainer.classList.remove('active');
    document.body.style.overflow = '';
  }
});

// ===========================
// ACTIVE NAV LINK ON SCROLL
// ===========================
function updateActiveLink() {
  let current = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    
    if (pageYOffset >= sectionTop - 200) {
      current = section.getAttribute('id');
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) {
      link.classList.add('active');
    }
  });
}

window.addEventListener('scroll', updateActiveLink);
window.addEventListener('load', updateActiveLink);

// ===========================
// FADE IN ANIMATION ON SCROLL
// ===========================
function checkFadeIn() {
  fadeElements.forEach(function(element) {
    const elementTop = element.getBoundingClientRect().top;
    const elementBottom = element.getBoundingClientRect().bottom;
    const isVisible = (elementTop < window.innerHeight - 100) && (elementBottom > 0);
    
    if (isVisible) {
      element.classList.add('visible');
    }
  });
}

window.addEventListener('scroll', checkFadeIn);
window.addEventListener('load', checkFadeIn);
window.addEventListener('resize', checkFadeIn);

// Run once on page load
checkFadeIn();
updateActiveLink();
