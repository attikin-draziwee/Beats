'use strict';

const reviews = [
  {
    image: './img/reviews/review-1.webp',
    title: 'Отличный звук',
    desc: 'Я ем малыми порциями, но часто. Это повышает мою продуктивность в разы. В течение дня сижу за компьютером и часто отходить в кафе или на кухню просто не могу себе позволить. А батончик – он всегда под рукой. Это приятно и удобно.',
    author: 'Билли Айлиш'
  },
  {
    image: './img/reviews/review-2.webp',
    title: 'Крутой дизайн',
    desc: 'После тренировок всегда хочется быстро закинуться чем-то белковым, потому что до дома ещё нужно доехать. А кушать хочется. Протеиновые батончики всегда выручают в этом плане. Спасибо производителю за этот качественный и экологичный продукт.',
    author: 'Вадим Грачев'
  },
  {
    image: './img/reviews/review-3.webp',
    title: 'На долго хватает заряда',
    desc: 'Батончики понравились. На мой взгляд слегка завышена цена по сравнению с конкурентами, однако, как говорится – оно того стоит. Нравится носить с собой, нравится держать в руке. Ну и конечно же, кушать. Идеально утоляют голод, хоть и не надолго. Через час уже ем ещё один. Но это скорее плюс, чем минус.',
    author: 'Мария Орлова'
  }];

const reviewItem = document.querySelector('.review__item');
const switchList = document.querySelector('.review-switcher__list');

switchList.addEventListener('click', e => {
  e.preventDefault();
  for (let i of switchList.children)
    if (e.target.parentNode.parentNode == i) {
      clearClass('review-switcher__item--active');
      i.classList.add('review-switcher__item--active');
      changeReview(i.getAttribute('index'), reviewItem);
    }
});

function changeReview(index, review) {
  const reviewImg = review.querySelector('.review__pic');
  const reviewTitle = review.querySelector('.review__title');
  const reviewDesc = review.querySelector('.review__desc p');
  const reviewAuthor = review.querySelector('.review__author');
  reviewImg.src = reviews[index].image;
  reviewTitle.innerHTML = reviews[index].title;
  reviewDesc.innerHTML = reviews[index].desc;
  reviewAuthor.innerHTML = reviews[index].author;
}