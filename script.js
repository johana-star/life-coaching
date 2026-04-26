const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.1 });
document.querySelectorAll('.animate').forEach(el => observer.observe(el));

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  });
});

(function() {
  const nav = document.querySelector('body > nav');
  if (!nav) return;
  let lastY = 0;
  const threshold = 100;

  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (y < threshold) {
      nav.classList.remove('nav-hidden');
    } else if (y > lastY) {
      nav.classList.add('nav-hidden');
    } else {
      nav.classList.remove('nav-hidden');
    }
    lastY = y;
  }, { passive: true });
})();
