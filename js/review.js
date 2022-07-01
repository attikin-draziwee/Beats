'use strict';
const reviewList = document.querySelector('.review__list');
const switchList = document.querySelector('.review-switcher__list');

switchList.addEventListener('click', e => {
  e.preventDefault();

  for (let i of switchList.children)
    if (e.target.parentNode.parentNode == i) {
      clearClass('review-switcher__item--active');
      i.classList.add('review-switcher__item--active');
      for (let j of reviewList.children) {
        j.style.left = -(j.offsetWidth * i.getAttribute('index')) + 'px';
      }
    }
});