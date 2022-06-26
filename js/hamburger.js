'use strict';
const hamburger = document.querySelector('.hamburger');

hamburger.addEventListener('click', e => {
  e.preventDefault();
  const overlay = document.createElement('div');
  overlay.classList.add('overlay');
  overlay.innerHTML = document.querySelector('#overlay').innerHTML;
  document.body.append(overlay);

  const close = overlay.querySelector('.overlay__close');

  close.addEventListener('click', e => {
    e.preventDefault();
    document.body.removeChild(overlay);
  });

  overlay.addEventListener('click', e => {
    e.preventDefault();
    if (e.target == overlay || e.classList.contains('menu__link'))
      close.click();
  });

});