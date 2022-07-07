'use strict';

$('.menu__link').on('click', function () {
  scrollTo($(this).attr('to'));
});

$('.paginator-item').on('click', function () {
  scrollTo($(this).attr('to'));
});

function scrollTo(className) {
  clearClass('paginator-item--active');
  $('.paginator-item').filter((ind, el) => $(el).attr('to') === className).addClass('paginator-item--active');
  window.scroll({
    left: 0,
    top: $(className).offset().top,
    behavior: 'smooth',
  });
}