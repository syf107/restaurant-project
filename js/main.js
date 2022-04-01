// adding sticky header follow with background.
const sectionHeroEl = document.querySelector(".hero-header");

const obs = new IntersectionObserver(
  function (entries) {
    const ent = entries[0];

    if (ent.isIntersecting === false) {
      document.body.classList.add("sticky");
    }

    if (ent.isIntersecting) {
      document.body.classList.remove("sticky");
    }
  },
  {
    // In the viewport
    root: null,
    threshold: 0,
    rootMargin: "-80px",
  }
);
obs.observe(sectionHeroEl);

// adding button to make food picture appear based on its category
const allCategory = document.querySelector(".all-category");
const breakfastCategory = document.querySelector(".breakfast-category");
const lunchCategory = document.querySelector(".lunch-category");
const dinnerCategory = document.querySelector(".dinner-category");
const dessertCategory = document.querySelector(".desserts-category");
const shakeCategory = document.querySelector(".shake-category");
const foodPicAll = document.querySelectorAll(".food-pic");

allCategory.addEventListener("click", showAll);
breakfastCategory.addEventListener("click", () => onlyCategory("breakfast"));
lunchCategory.addEventListener("click", () => onlyCategory("lunch"));
dinnerCategory.addEventListener("click", () => onlyCategory("dinner"));
dessertCategory.addEventListener("click", () => onlyCategory("desserts"));
shakeCategory.addEventListener("click", () => onlyCategory("shake"));

function onlyCategory(category) {
  foodPicAll.forEach((foodPic) => {
    if (!foodPic.classList.contains(category)) {
      foodPic.style.display = "none";
    } else {
      foodPic.style.display = "block";
    }
  });
}

function showAll() {
  foodPicAll.forEach((foodPic) => {
    foodPic.style.display = "block";
  });
}

//video carousel slider
const track = document.querySelector(".carousel__track");
const slides = Array.from(track.children);
const nextButton = document.querySelector(".carousel__button--right");
const prevButton = document.querySelector(".carousel__button--left");
const dotsNav = document.querySelector(".carousel__nav");
const dots = Array.from(dotsNav.children);

const slideWidth = slides[0].getBoundingClientRect().width;
// console.log(slideWidth);

// arrange the slide to next each other.

const setSlidePosition = (slide, index) => {
  slide.style.left = `${slideWidth * index}px`;
};

slides.forEach(setSlidePosition);

const moveToSlide = (track, currentSlide, targetSlide) => {
  track.style.transform = `translateX(-${targetSlide.style.left})`;
  currentSlide.classList.remove("current-slide");
  targetSlide.classList.add("current-slide");
};

const updateDots = (currentDot, targetDot) => {
  currentDot.classList.remove("current-slide");
  targetDot.classList.add("current-slide");
};

const hideShowArrow = (slides, prevButton, nextButton, targetIndex) => {
  if (targetIndex === 0) {
    prevButton.classList.add("is-hidden");
    nextButton.classList.remove("is-hidden");
  } else if (targetIndex === slides.length - 1) {
    prevButton.classList.remove("is-hidden");
    nextButton.classList.add("is-hidden");
  } else {
    prevButton.classList.remove("is-hidden");
    nextButton.classList.remove("is-hidden");
  }
};

// when I click left, move the slide to the left.
prevButton.addEventListener("click", (e) => {
  const currentSlide = track.querySelector(".current-slide");
  const prevSlide = currentSlide.previousElementSibling;
  const currentDot = dotsNav.querySelector(".current-slide");
  const prevDot = currentDot.previousElementSibling;
  const nextIndex = slides.findIndex((slide) => slide === prevSlide);

  moveToSlide(track, currentSlide, prevSlide);
  updateDots(currentDot, prevDot);
  hideShowArrow(slides, prevButton, nextButton, prevSlide);
});

// when I click right, move the slide to the right.
nextButton.addEventListener("click", (e) => {
  const currentSlide = track.querySelector(".current-slide");
  const nextSlide = currentSlide.nextElementSibling;
  const currentDot = dotsNav.querySelector(".current-slide");
  const nextDot = currentDot.nextElementSibling;
  const nextIndex = slides.findIndex((slide) => slide === nextSlide);

  moveToSlide(track, currentSlide, nextSlide);
  updateDots(currentDot, nextDot);
  hideShowArrow(slides, prevButton, nextButton, nextIndex);
});

// when I move the nav indicators, move to that slide.
dotsNav.addEventListener("click", (e) => {
  // what indicator was clicked on?
  const targetDot = e.target.closest("button");

  if (!targetDot) return;

  const currentSlide = track.querySelector(".current-slide");
  const currentDot = dotsNav.querySelector(".current-slide");
  const targetIndex = dots.findIndex((dot) => dot === targetDot);
  const targetSlide = slides[targetIndex];

  moveToSlide(track, currentSlide, targetSlide);
  updateDots(currentDot, targetDot);
  hideShowArrow(slides, prevButton, nextButton, targetIndex);
});
