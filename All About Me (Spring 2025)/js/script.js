document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.querySelector(".hamburger");
  const navUL = document.querySelector("nav ul");
  if (hamburger && navUL) {
    hamburger.addEventListener("click", function () {
      navUL.classList.toggle("show");
      console.log("Hamburger clicked. Current nav class:", navUL.className);
    });
  } else {
    console.error("Hamburger or navigation <ul> element not found.");
  }
  const modeToggle = document.getElementById("mode-toggle");
  if (modeToggle) {
    const currentMode = localStorage.getItem("mode");
    if (currentMode === "dark") {
      document.body.classList.add("dark-mode");
    }
    modeToggle.addEventListener("click", function () {
      document.body.classList.toggle("dark-mode");
      if (document.body.classList.contains("dark-mode")) {
        localStorage.setItem("mode", "dark");
      } else {
        localStorage.setItem("mode", "light");
      }
    });
  } else {
    console.error("Mode toggle button not found.");
  }
  const lightboxModal = document.getElementById("lightboxModal");
  const lightboxImage = document.getElementById("lightboxImage");
  window.openLightbox = function (src) {
    if (lightboxModal && lightboxImage) {
      lightboxImage.src = src;
      lightboxModal.style.display = "flex";
    } else {
      console.error("Lightbox modal or image element not found.");
    }
  };
  window.closeLightbox = function () {
    if (lightboxModal) {
      lightboxModal.style.display = "none";
    }
  };
  const videoLightboxModal = document.getElementById("videoLightboxModal");
  const videoLightbox = document.getElementById("videoLightbox");
  window.openVideoLightbox = function (src) {
    if (videoLightboxModal && videoLightbox) {
      const sourceElem = videoLightbox.querySelector("source");
      if (sourceElem) {
        sourceElem.src = src;
      }
      videoLightbox.load();
      videoLightboxModal.style.display = "flex";
    } else {
      console.error("Video lightbox modal or video element not found.");
    }
  };
  window.closeVideoLightbox = function (event) {
    if (event.target.id === "videoLightboxModal") {
      if (videoLightboxModal && videoLightbox) {
        videoLightbox.pause();
        const sourceElem = videoLightbox.querySelector("source");
        if (sourceElem) {
          sourceElem.src = "";
        }
        videoLightbox.load();
        videoLightboxModal.style.display = "none";
      }
    }
  };
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      let valid = true;
      const nameField = document.getElementById("name");
      const emailField = document.getElementById("email");
      const messageField = document.getElementById("message");
      if (!nameField.value.trim()) {
        valid = false;
        nameField.style.borderColor = "red";
      } else {
        nameField.style.borderColor = "";
      }
      if (!emailField.value.trim() || !validateEmail(emailField.value.trim())) {
        valid = false;
        emailField.style.borderColor = "red";
      } else {
        emailField.style.borderColor = "";
      }
      if (!messageField.value.trim()) {
        valid = false;
        messageField.style.borderColor = "red";
      } else {
        messageField.style.borderColor = "";
      }
      const formNotification = document.getElementById("formNotification");
      if (valid) {
        formNotification.textContent = "Thanks for reaching out!";
        formNotification.classList.remove("hidden");
        contactForm.reset();
      } else {
        formNotification.textContent = "Please fill in all fields correctly.";
        formNotification.classList.remove("hidden");
      }
    });
  }
  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }
});
