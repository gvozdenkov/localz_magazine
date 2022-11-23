const header = document.querySelector(".header");
const stickyHeader = document.querySelector(".sticky-header");
const openMenuButton = document.querySelector(".sticky-header__open-menu-btn");
const openMobileMenuButton = document.querySelector(".mobile-menu__open-btn");
const closeMenuButton = document.querySelector(".menu__close-button");
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

// ================= Burger menu ================================================

const burgerMenuButton = document.querySelector(".hamburger");

const toggleBurgerMenuClose = () => {
  burgerMenuButton.firstChild.data === "Меню"
    ? (burgerMenuButton.firstChild.data = "Закрыть")
    : (burgerMenuButton.firstChild.data = "Меню");

  burgerMenuButton.classList.toggle("hamburger_opened");
};

burgerMenuButton.addEventListener("click", () => {
  toggleBurgerMenuClose();
  menu.classList.toggle("menu_hamburger");
});

// ================= Dropdown Menu ================================================
let intervalId;

const dropdownButtons = document.querySelectorAll(".menu__link_type_dropdwon");

dropdownButtons.forEach((evt) => {
  evt.addEventListener("click", (evt) => {
    const menu = evt.currentTarget.dataset.path;
    const menus = document.querySelectorAll(".dropdown-menu");
    menus.forEach((evt) => {
      const currentDropdown = document.querySelector(`[data-target=${menu}]`);
      if (!currentDropdown.classList.contains("open")) {
        currentDropdown.classList.add("dropdown-menu_is-open");
        intervalId = setTimeout(() => {
          currentDropdown.classList.add("open");
        }, 0);
      }

      if (currentDropdown.classList.contains("open")) {
        clearTimeout(intervalId);
        currentDropdown.classList.remove("dropdown-menu_is-open");
        intervalId = setTimeout(() => {
          currentDropdown.classList.remove("open");
        }, 0);
      }
    });
  });
});

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
