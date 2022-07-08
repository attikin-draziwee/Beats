'use strict';

const sliderArrowLeft = document.querySelector('.slider__arrow-left');
const sliderArrowRight = document.querySelector('.slider__arrow-right');

$(document).ready(function () {
  $('.slider__list').slick({
    nextArrow: $('.slider__arrow-right'),
    prevArrow: $('.slider__arrow-left'),
  });
});