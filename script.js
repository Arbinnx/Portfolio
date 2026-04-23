// Hamburger menu toggle
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");
 
hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navLinks.classList.toggle("active");
});
 
// Close nav on link click (mobile)
navLinks.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navLinks.classList.remove("active");
  });
});
 
// Skill bar animation with counter
const bars = document.querySelectorAll(".progress-bar");
const numbers = document.querySelectorAll(".skill-number");
const targets = [90, 85, 75, 80];
 
const skillObserver = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting) {
    bars.forEach((bar, i) => {
      setTimeout(() => {
        bar.style.width = targets[i] + "%";
 
        let count = 0;
        const interval = setInterval(() => {
          if (count >= targets[i]) {
            clearInterval(interval);
          } else {
            count++;
            numbers[i].innerText = count + "%";
          }
        }, 15);
      }, i * 300);
    });
 
    skillObserver.disconnect();
  }
}, { threshold: 0.3 });
 
skillObserver.observe(document.querySelector(".about"));
 
// Hero entrance animation
window.addEventListener("load", () => {
  setTimeout(() => {
    document.querySelector(".hero-left").classList.add("show");
  }, 200);
 
  setTimeout(() => {
    document.querySelector(".hero-right").classList.add("show");
  }, 400);
 
  setTimeout(() => {
    document.querySelector(".hero-stats").classList.add("show");
  }, 800);
});
 
// Scroll reveal
const revealItems = document.querySelectorAll(".reveal");
 
function handleReveal() {
  const windowHeight = window.innerHeight;
  revealItems.forEach(item => {
    const elementTop = item.getBoundingClientRect().top;
    const revealPoint = 120;
    if (elementTop < windowHeight - revealPoint) {
      item.classList.add("show");
    } else {
      item.classList.remove("show");
    }
  });
}
 
window.addEventListener("scroll", handleReveal);
window.addEventListener("load", handleReveal);
 
// Navbar scroll effect
const navbar = document.querySelector(".navbar");
 
window.addEventListener("scroll", () => {
  if (window.scrollY > 40) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});
 
// Contact form validation
const form = document.getElementById("contactForm");
const successBox = document.getElementById("formSuccess");
 
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();
  const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,}$/;

  if (!name || !email || !message) {
    alert("Please fill in all fields.");
    return;
  }

  if (!email.match(emailPattern)) {
    alert("Please enter a valid email.");
    return;
  }

  const submitBtn = form.querySelector(".contact-btn");
  submitBtn.disabled = true;
  submitBtn.textContent = "Sending...";

  fetch(form.action, {
    method: "POST",
    body: new FormData(form),
    headers: { "Accept": "application/json" }
  })
    .then(response => {
      if (response.ok) {
        successBox.classList.add("show");
        form.reset();
        setTimeout(() => successBox.classList.remove("show"), 4000);
      } else {
        alert("Something went wrong. Please try again.");
      }
    })
    .catch(() => alert("Something went wrong. Please try again."))
    .finally(() => {
      submitBtn.disabled = false;
      submitBtn.textContent = "Send Message";
    });
});

const sections = document.querySelectorAll("section");
const navLinksAll = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 200;
    const sectionHeight = section.offsetHeight;

    if (window.scrollY >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navLinksAll.forEach(link => {
    link.classList.remove("active");

    if (link.getAttribute("href") === "#" + current) {
      link.classList.add("active");
    }
  });
});