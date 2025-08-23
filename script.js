// Toggle navigation menu on small screens
const navToggle = document.getElementById('nav-toggle');
const nav = document.getElementById('nav');

navToggle.addEventListener('click', () => {
  nav.classList.toggle('open');
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
});
