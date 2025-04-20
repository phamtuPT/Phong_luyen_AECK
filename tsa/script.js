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

  // Carousel
  let currentSlide = 0;
  const slides = document.querySelectorAll(".slide");
  const slidesContainer = document.querySelector(".carousel-slides");
  const dotsContainer = document.getElementById("dots");
  const prevButton = document.querySelector(".carousel-controls .prev");
  const nextButton = document.querySelector(".carousel-controls .next");
  let autoSlideInterval;

  // Hide controls if there's 1 or fewer slides
  if (slides.length <= 1) {
    prevButton.style.display = "none";
    nextButton.style.display = "none";
    dotsContainer.style.display = "none";
  }

  // Tạo dot
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

  // Attach event listeners to buttons
  prevButton.addEventListener("click", (e) => {
    e.stopPropagation();
    prevSlide();
  });
  nextButton.addEventListener("click", (e) => {
    e.stopPropagation();
    nextSlide();
  });

  // Auto slide
  function startAutoSlide() {
    autoSlideInterval = setInterval(nextSlide, 6000);
  }

  function stopAutoSlide() {
    clearInterval(autoSlideInterval);
  }

  startAutoSlide();

  // Dừng auto slide khi hover
  const carousel = document.querySelector(".news-carousel");
  carousel.addEventListener("mouseenter", stopAutoSlide);
  carousel.addEventListener("mouseleave", startAutoSlide);

  // Hamburger menu toggle
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