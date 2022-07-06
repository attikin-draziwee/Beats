'use strict';
const hamburger = document.querySelector('.hamburger');

hamburger.addEventListener('click', e => {
  const body = document.body;
  body.classList.add('locked');
  e.preventDefault();
  const overlay = document.createElement('div');
  overlay.classList.add('overlay');
  overlay.innerHTML = document.querySelector('#overlay').innerHTML;
  body.append(overlay);

  const close = overlay.querySelector('.overlay__close');

  close.addEventListener('click', e => {
    e.preventDefault();
    body.classList.remove('locked');
    body.removeChild(overlay);
  });

  overlay.addEventListener('click', e => {
    e.preventDefault();
    if (e.target == overlay || e.target.classList.contains('menu__link'))
      close.click();
  });

});