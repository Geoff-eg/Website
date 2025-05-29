document.addEventListener("DOMContentLoaded", function () {
  const ctaPopup = document.getElementById("ctaPopup");
  const closeBtn = document.querySelector(".cta-close");

  if (!ctaPopup) return;

  // Show the popup after 8 seconds
  setTimeout(() => {
    ctaPopup.classList.add("show");
  }, 8000);

  console.log("CTA Popup script loaded!");

  // Close button hides the popup
  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      ctaPopup.classList.remove("show");
    });
  }
});

