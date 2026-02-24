document.addEventListener("DOMContentLoaded", () => {
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  // Add scroll animation observer
  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1,
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Apply animation to elements
  const animateElements = document.querySelectorAll(
    ".story-content, .cta-container",
  );
  animateElements.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(50px)";
    el.style.transition = "all 0.8s ease-out";
    observer.observe(el);
  });

  // Simple sticky navbar effect
  const navbar = document.querySelector(".navbar");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.style.boxShadow = "0 4px 30px rgba(0, 0, 0, 0.5)";
      navbar.style.background = "rgba(13, 17, 23, 0.95)";
    } else {
      navbar.style.boxShadow = "none";
      navbar.style.background = "rgba(13, 17, 23, 0.8)";
    }
  });

  // CA Copy functionality
  const copyBtn = document.getElementById('copy-btn');
  const caText = document.getElementById('ca-text');
  const copyToast = document.getElementById('copy-toast');

  if (copyBtn && caText && copyToast) {
    copyBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(caText.textContent).then(() => {
        copyToast.classList.add('show');
        setTimeout(() => {
          copyToast.classList.remove('show');
        }, 2000);
      }).catch(err => {
        console.error('Failed to copy text: ', err);
      });
    });
  }
});
