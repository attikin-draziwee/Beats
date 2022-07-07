'use strict';

$('.colors__item').on('click', function (e) {
  if ($(this).hasClass('colors__item--active'))
    $(this).toggleClass('colors__item--active');
  else {
    $('.colors__item').removeClass('colors__item--active');
    $(this).toggleClass('colors__item--active');
  }
});