const backToTopBtn = document.getElementById("backToTopBtn");
const homeSection = document.getElementById("home");

window.addEventListener("scroll", () => {
  const homeSectionBottom = homeSection.offsetTop + homeSection.offsetHeight;

  if (window.scrollY > homeSectionBottom) {
    backToTopBtn.style.display = "block";
  } else {
    backToTopBtn.style.display = "none";
  }
});

backToTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});
