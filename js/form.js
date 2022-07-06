'use strict';

const formBtn = document.querySelector('.delivery__button'),
  form = document.querySelector('.delivery__form');

formBtn.addEventListener('click', function () {
  validForm(form);
});

function validForm(form) {
  switch (true) {
    case !validField(form.elements.name):
    case !validField(form.elements.phone):
    case !validField(form.elements.desc):
      return false;
    default:
      const date = {
        name: form.elements.name.value,
        phone: form.elements.phone.value,
        comment: form.elements.desc.value,
        to: 'yongeryk@gmail.com'
      };
      console.log(date);
      const xhr = new XMLHttpRequest();
      xhr.responseType = 'json';
      xhr.open('POST', 'https://webdev-api.loftschool.com/sendmail');
      xhr.setRequestHeader('content-type', 'application/json');
      xhr.send(JSON.stringify(date));

      xhr.addEventListener('load', (e) => {
        console.log(xhr.response.status);
        document.body.appendChild(createOverlay(xhr.response.message));
      });

  }
}

function validField(element) {
  clearClass('delivery__space--invalid');
  if (!element.checkValidity()) {
    element.classList.add('delivery__space--invalid');
  } else {
    return true;
  }
}

function createOverlay(text) {
  const overlay = document.createElement('div');
  overlay.classList.add('overlay');
  overlay.innerHTML = '<div class="overlay__message"><div class="overlay__text">Сообщение отправлено</div><a href="#" class="button close">Закрыть</a></div>';
  const overlayMessage = overlay.querySelector('.overlay__text');
  overlayMessage.innerHTML = text;
  const overlayClose = overlay.querySelector('.close');
  overlayClose.addEventListener('click', function (e) {
    e.preventDefault();
    document.body.removeChild(overlay);
  });
  overlay.addEventListener('click', (e) => {
    if (e.target == overlay)
      overlayClose.click();
  })
  return overlay;
};