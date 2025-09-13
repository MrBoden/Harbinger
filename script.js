// Toggle navigation menu on small screens
const navToggle = document.getElementById('nav-toggle');
const nav = document.getElementById('nav');

navToggle.addEventListener('click', () => {
  nav.classList.toggle('open');
});

// Dark mode toggle
const themeToggle = document.getElementById('theme-toggle');
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
  document.body.classList.add('dark');
}

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  const mode = document.body.classList.contains('dark') ? 'dark' : 'light';
  localStorage.setItem('theme', mode);
});

// Smooth scrolling for anchor links and CTA buttons
document.querySelectorAll('a[href^="#"], [data-scroll]').forEach(el => {
  el.addEventListener('click', e => {
    const target = el.getAttribute('href') || el.dataset.scroll;
    if (target.startsWith('#')) {
      e.preventDefault();
      document.querySelector(target).scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Service accordion
const serviceTitles = document.querySelectorAll('.service-title');
serviceTitles.forEach(btn => {
  btn.addEventListener('click', () => {
    const content = btn.nextElementSibling;
    content.classList.toggle('open');
    btn.setAttribute('aria-expanded', content.classList.contains('open'));
  });
});

// Testimonials slider
const testimonials = [
  { text: 'Oxbow transformed our workflow with incredible efficiency.', author: 'River Co.' },
  { text: 'Their design team is top-notch and great to work with.', author: 'Creative Current' },
  { text: 'Reliable and innovative solutions every time.', author: 'Estuary Enterprises' }
];

let currentTestimonial = 0;
const testimonialEl = document.getElementById('testimonial');
const prevBtn = document.getElementById('testimonial-prev');
const nextBtn = document.getElementById('testimonial-next');

function renderTestimonial(index) {
  const t = testimonials[index];
  testimonialEl.innerHTML = `<p>${t.text}</p><p class="author">- ${t.author}</p>`;
}
renderTestimonial(0);

prevBtn.addEventListener('click', () => {
  currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
  renderTestimonial(currentTestimonial);
});

nextBtn.addEventListener('click', () => {
  currentTestimonial = (currentTestimonial + 1) % testimonials.length;
  renderTestimonial(currentTestimonial);
});

// Show current year in footer
const yearSpan = document.getElementById('year');
yearSpan.textContent = new Date().getFullYear();

// Simple client-side contact form handler
const form = document.getElementById('contact-form');
const status = document.getElementById('form-status');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  status.textContent = 'Thank you for your message!';
  form.reset();
  setTimeout(() => {
    status.textContent = '';
  }, 3000);
});

// Back to top button
const backToTop = document.getElementById('back-to-top');
window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    backToTop.classList.add('visible');
  } else {
    backToTop.classList.remove('visible');
  }
});

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
