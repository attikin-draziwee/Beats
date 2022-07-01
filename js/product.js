'use strict';

const sliderList = document.querySelector('.slider__list');
const sliderArrowLeft = document.querySelector('.slider__arrow-left');
const sliderArrowRight = document.querySelector('.slider__arrow-right');

sliderArrowLeft.addEventListener('click', e => {
  e.preventDefault();
  sliderList.prepend(sliderList.lastElementChild);
});

sliderArrowRight.addEventListener('click', e => {
  e.preventDefault();
  sliderList.appendChild(sliderList.firstElementChild);
});