document.addEventListener("DOMContentLoaded", function() {
  console.log("Trang web THPT Lương Tài đã sẵn sàng.");

  // Hiệu ứng xuất hiện cho news-item
  const newsItems = document.querySelectorAll(".news-item");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add("visible");
          }, index * 200);
        }
      });
    },
    { threshold: 0.2 }
  );

  newsItems.forEach((item) => observer.observe(item));

  // Hiệu ứng xuất hiện cho schedule-item
  const scheduleItems = document.querySelectorAll(".schedule-item");
  const scheduleObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add("visible");
          }, index * 200);
        }
      });
    },
    { threshold: 0.1 }
  );

  scheduleItems.forEach((item) => scheduleObserver.observe(item));

  // Functionality for "Vào thi" buttons
  const scheduleButtons = document.querySelectorAll(".schedule-button");

  // Clear localStorage for schedule items on page load to reset state
  scheduleItems.forEach((_, index) => {
    localStorage.removeItem(`schedule-item-${index}`);
  });

  // Add click event listener to each "Vào thi" button
  scheduleButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
      const link = button.getAttribute("data-link");
      if (link) {
        window.open(link, "_blank");
      }

      const scheduleItem = button.closest(".schedule-item");
      scheduleItem.classList.add("disabled");
      button.disabled = true;
      button.textContent = "Đã thi";

      localStorage.setItem(`schedule-item-${index}`, "completed");
    });
  });

  // Functionality for "Đáp án" buttons
  const answerButtons = document.querySelectorAll(".answer-button");
  answerButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const answerLink = button.getAttribute("data-answer-link");
      if (answerLink) {
        window.open(answerLink, "_blank");
      }
    });
  });

  // Carousel
  let currentSlide = 0;
  const slides = document.querySelectorAll(".slide");
  const slidesContainer = document.querySelector(".carousel-slides");
  const dotsContainer = document.getElementById("dots");
  const prevButton = document.querySelector(".carousel-controls .prev");
  const nextButton = document.querySelector(".carousel-controls .next");
  let autoSlideInterval;

  if (slides.length <= 1) {
    prevButton.style.display = "none";
    nextButton.style.display = "none";
    dotsContainer.style.display = "none";
  }

  slides.forEach((_, i) => {
    const dot = document.createElement("span");
    dot.classList.add("dot");
    if (i === 0) dot.classList.add("active");
    dot.addEventListener("click", (e) => {
      e.stopPropagation();
      goToSlide(i);
    });
    dotsContainer.appendChild(dot);
  });

  const dots = document.querySelectorAll(".dot");

  function showSlide(index) {
    if (index < 0) index = slides.length - 1;
    if (index >= slides.length) index = 0;
    slidesContainer.style.transform = `translateX(-${index * 100}%)`;
    dots.forEach((dot, i) => dot.classList.toggle("active", i === index));
    currentSlide = index;
  }

  function nextSlide() {
    showSlide(currentSlide + 1);
  }

  function prevSlide() {
    showSlide(currentSlide - 1);
  }

  function goToSlide(index) {
    showSlide(index);
  }

  prevButton.addEventListener("click", (e) => {
    e.stopPropagation();
    prevSlide();
  });
  nextButton.addEventListener("click", (e) => {
    e.stopPropagation();
    nextSlide();
  });

  function startAutoSlide() {
    autoSlideInterval = setInterval(nextSlide, 6000);
  }

  function stopAutoSlide() {
    clearInterval(autoSlideInterval);
  }

  startAutoSlide();

  const carousel = document.querySelector(".news-carousel");
  carousel.addEventListener("mouseenter", stopAutoSlide);
  carousel.addEventListener("mouseleave", startAutoSlide);

  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".main-nav ul");

  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
  });

  document.querySelectorAll(".main-nav ul li a").forEach(link => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active");
      navMenu.classList.remove("active");
    });
  });

  // Chống Ctrl+S, Ctrl+U, F12, Ctrl+Shift+I (Không hiện alert)
  document.addEventListener("keydown", function(e) {
    if (e.key === "F12" || e.keyCode === 123) {
      e.preventDefault();
      return false;
    }
    if (e.ctrlKey) {
      const key = e.key.toLowerCase();
      if (key === "u" || key === "s" || (e.shiftKey && key === "i")) {
        e.preventDefault();
        return false;
      }
    }
  });

  // Chặn chuột phải
  document.addEventListener("contextmenu", function(e) {
    e.preventDefault();
    return false;
  });
});

// Scroll Top Button
window.addEventListener("scroll", () => {
  const btn = document.getElementById("scrollTop");
  if (window.scrollY > 300) btn.style.display = "block";
  else btn.style.display = "none";
});

document.getElementById("scrollTop").addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});