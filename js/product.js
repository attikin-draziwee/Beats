'use strict';

const sliderList = document.querySelector('.slider__list');
const sliderArrowLeft = document.querySelector('.slider__arrow-left');
const sliderArrowRight = document.querySelector('.slider__arrow-right');

$(document).ready(function () {
  $('.slider__list').slick({
    nextArrow: $('.slider__arrow-right'),
    prevArrow: $('.slider__arrow-left'),
  });
});

sliderArrowLeft.addEventListener('click', e => {
  e.preventDefault();
  sliderList.prepend(sliderList.lastElementChild);
});

sliderArrowRight.addEventListener('click', e => {
  e.preventDefault();
  sliderList.appendChild(sliderList.firstElementChild);
});