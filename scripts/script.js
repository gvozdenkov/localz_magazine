const header = document.querySelector(".header");
const stickyHeader = document.querySelector(".sticky-header");
let currentPositionOfScroll = 0;
const slide = document.querySelector(".slide");
const sliderContainer = document.querySelector(".slider-content");
const openMenuButton = document.querySelector(
  ".sticky-header__open-menu-button"
);
const closeMenuButton = document.querySelector(".menu__close-button");
const openMobileMenuButton = document.querySelector(
  ".mobile-menu__open-menu-button"
);
const sliderArrowLeft = document.querySelector(
  ".slider-navigation__arrow_left"
);
const sliderArrowRight = document.querySelector(
  ".slider-navigation__arrow_right"
);
const buttonToNews = document.querySelector(".navigation-button");

const sliderContainer = document.querySelector(".slider-container");
const sliderContainerItem = document.querySelector(".slider-container__item");
const sliderArrowLeft = document.querySelector(".slider-nav__arrow_dir_left");
const sliderArrowRight = document.querySelector(".slider-nav__arrow_dir_right");
const sliderProgress = document.querySelector(".progress-bar");
const sliderProgressIndicator = document.querySelector(
  ".progress-bar__indicator"
);

const card = document.querySelector(".card");
const menu = document.querySelector(".menu");
const page = document.querySelector(".page");

// ================= Scroll image gallery =========================================

let currentPositionOfScroll = 0;
let newPositionOfScroll = 0;

const getCardMarginRight = (element) => {
  const style = window.getComputedStyle(element) || element.currentStyle;
  return parseInt(style.marginRight.slice(0, -2));
};

const getCardWidthWithMarginRight = (element) => {
  return element.clientWidth + getCardMarginRight(element);
};

const getSliderContainerWidth = (container) => {
  const containerElement = container.children[0];

  const slideWidth = getCardWidthWithMarginRight(containerElement);
  const countOfSlides = container.children.length;

  return slideWidth * countOfSlides - getCardMarginRight(containerElement);
};

const getViewportWidth = () => {
  return document.querySelector(".page").clientWidth;
};

const slideWidth = getCardWidthWithMarginRight(sliderContainerItem);
const sliderContainerWidth = getSliderContainerWidth(sliderContainer);

const getEndPositionOfScroll = () => {
  return getSliderContainerWidth(sliderContainer) - sliderContainer.clientWidth;
};

const scrollSlider = (positionOfScroll) => {
  sliderContainer.scroll({
    left: positionOfScroll,
    behavior: "smooth",
  });

  currentPositionOfScroll = positionOfScroll;
};

const getNewPositionOfScrollRight = () => {
  const newPositionOfScroll = currentPositionOfScroll + slideWidth;

  return newPositionOfScroll > sliderContainerWidth - slideWidth
    ? currentPositionOfScroll
    : newPositionOfScroll;
};

const getNewPositionOfScrollLeft = () => {
  const newPositionOfScroll = currentPositionOfScroll - slideWidth;

  return newPositionOfScroll <= 0 ? 0 : newPositionOfScroll;
};

// const scrolled = sliderContainerWidth / ;
const updateProgressBar = (currentPositionOfScroll) => {
  const endPositionOfScroll = getEndPositionOfScroll();
  const visiblePartOfGallary =
    (currentPositionOfScroll / endPositionOfScroll) * 100;
  const scrolled = (sliderProgress.clientWidth * visiblePartOfGallary) / 100;

  document.querySelector(".progress-bar__indicator").style.width =
    scrolled + "px";
};

const handleScrollRight = () => {
  newPositionOfScroll = getNewPositionOfScrollRight();
  scrollSlider(newPositionOfScroll);
  updateProgressBar(newPositionOfScroll);
};

const handleScrollLeft = () => {
  newPositionOfScroll = getNewPositionOfScrollLeft();
  scrollSlider(newPositionOfScroll);
  updateProgressBar(newPositionOfScroll);
};

sliderArrowRight.addEventListener("click", handleScrollRight);
sliderArrowLeft.addEventListener("click", handleScrollLeft);
