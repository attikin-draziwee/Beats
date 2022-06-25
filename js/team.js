'use strict';

const teamList = document.querySelector('.team__list');
const tabMedia = window.matchMedia('(max-width: 768px)');
const mobMedia = window.matchMedia('(max-width: 480px)');



teamList.addEventListener('click', e => {
  e.preventDefault();
  if (e.target.classList.contains('team__show') && mobMedia.matches) {
    clearClass('team__show--mob-active');
    e.target.classList.add('team__show--mob-active');
  } else if (e.target.classList.contains('team__show') && tabMedia.matches) {
    clearClass('team__show--tab-active');
    e.target.classList.add('team__show--tab-active');
  } else if (e.target.classList.contains('team__show')) {
    clearClass('team__show--active');
    e.target.classList.add('team__show--active');
  }
});

function clearClass(className) {
  for (let i of document.querySelectorAll(`.${className}`))
    i.classList.remove(className);
}