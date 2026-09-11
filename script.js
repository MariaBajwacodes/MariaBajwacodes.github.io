// ===== MARIA'S PORTFOLIO JAVASCRIPT =====

const $ = (selector) => document.querySelector(selector);

// Mobile navigation
const menuToggle = $("#menuToggle");
const navLinks = $("#navLinks");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("open");
});

document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => navLinks.classList.remove("open"));
});

// Typing effect
const words = ["Artificial Intelligence Student", "Python Learner", "Web Developer", "AI Enthusiast"];
let wordIndex = 0, charIndex = 0, deleting = false;

function typeEffect() {
  const current = words[wordIndex];
  $("#typing").textContent = current.substring(0, charIndex);

  if (!deleting && charIndex < current.length) {
    charIndex++;
    setTimeout(typeEffect, 85);
  } else if (!deleting && charIndex === current.length) {
    deleting = true;
    setTimeout(typeEffect, 1400);
  } else if (deleting && charIndex > 0) {
    charIndex--;
    setTimeout(typeEffect, 45);
  } else {
    deleting = false;
    wordIndex = (wordIndex + 1) % words.length;
    setTimeout(typeEffect, 300);
  }
}
typeEffect();

// Theme
const themeToggle = $("#themeToggle");
const savedTheme = localStorage.getItem("maria-theme");
if (savedTheme) document.documentElement.dataset.theme = savedTheme;

function updateThemeIcon() {
  themeToggle.textContent = document.documentElement.dataset.theme === "light" ? "☀" : "☾";
}
updateThemeIcon();

themeToggle.addEventListener("click", () => {
  const light = document.documentElement.dataset.theme === "light";
  if (light) {
    delete document.documentElement.dataset.theme;
    localStorage.setItem("maria-theme", "dark");
  } else {
    document.documentElement.dataset.theme = "light";
    localStorage.setItem("maria-theme", "light");
  }
  updateThemeIcon();
});

// Reveal animations
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add("visible");
  });
}, {threshold: 0.12});

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

// Active nav link
const sections = document.querySelectorAll("section[id]");
const navItems = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 160) current = section.id;
  });
  navItems.forEach(item => {
    item.classList.toggle("active", item.getAttribute("href") === `#${current}`);
  });

  // Reading progress
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
  $("#progressBar").style.width = `${progress}%`;

  // Top button
  $("#topBtn").classList.toggle("show", window.scrollY > 500);
});

$("#topBtn").addEventListener("click", () => window.scrollTo({top:0, behavior:"smooth"}));

// Contact form: opens the visitor's email client.
// IMPORTANT: replace YOUR_EMAIL@example.com below with your real email.
$("#contactForm").addEventListener("submit", (event) => {
  event.preventDefault();

  const name = $("#name").value.trim();
  const email = $("#email").value.trim();
  const message = $("#message").value.trim();

  const destination = "mariabajwaofficial3@gmail.com"
  const subject = encodeURIComponent(`Portfolio message from ${name}`);
  const body = encodeURIComponent(
    `Hello Maria,\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
  );

  window.location.href = `mailto:${destination}?subject=${subject}&body=${body}`;
});

// Current year
$("#year").textContent = new Date().getFullYear();
