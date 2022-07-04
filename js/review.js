'use strict';

const switcher = $('.review-switcher__item');

switcher.on('click', function (e) {
  e.preventDefault();
  clearClass('review-switcher__item--active');
  $(this).addClass('review-switcher__item--active');
  $('.review__item').css('left', `${-(100 * $(this).index())}%`);
});