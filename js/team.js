'use strict';

const teamList = document.querySelector('.team__list');
const tabMedia = window.matchMedia('(max-width: 768px)');
const mobMedia = window.matchMedia('(max-width: 480px)');

if (tabMedia.matches) {
  const firstTeamItem = document.querySelector('.team__show');
  firstTeamItem.classList.add('team__show--tab-active');
}

teamList.addEventListener('click', e => {
  e.preventDefault();
  if (e.target.classList.contains('team__show')) {

    containsClass('team__show--mob-active', e);
    containsClass('team__show--tab-active', e);
    containsClass('team__show--active', e);
  }
}
);

function containsClass(className, event) {
  if (event.target.classList.contains(className))
    event.target.classList.remove(className);
  else {
    clearClass(className);
    event.target.classList.add(className);
  }
}

function clearClass(className) {
  for (let i of document.querySelectorAll(`.${className}`))
    i.classList.remove(className);
}