'use strict';

const section = $('section');
const mainContent = $('.wrapper-content');
let inScroll = false;
section.first().addClass('active');

$('.menu__link').on('click', function () {
  scrollTo($(this).attr('data-to'));
});

$('.paginator-item').on('click', function () {
  scrollTo($(this).attr('data-to'));
});

function scrollTo(className) {
  clearClass('paginator-item--active');
  $('.paginator-item').filter((ind, el) => $(el).attr('data-to') === className).addClass('paginator-item--active');
  performTransition(section.filter(className).index());
  if (!section.first().hasClass('active')) {
    $('.header').addClass('dn');
  }
  else {
    $('.header').removeClass('dn');
  }
}

const performTransition = sectionInd => {
  if (!inScroll) {
    inScroll = true;
    const sectionHeight = $('.wrapper-content').height() / section.length;
    const position = (sectionHeight * 100 / $('.wrapper-content').height()) * -sectionInd;
    mainContent.css({
      'transform': `translateY(${position}%)`,
    });
    section.eq(sectionInd).addClass('active').siblings().removeClass('active');
    setTimeout(e => {
      inScroll = false;
    }, 300);
  }
};

const scrollDirection = dir => {
  const activeSection = section.filter('.active');
  const nextSection = activeSection.next();
  const prevSection = activeSection.prev();
  if (dir === 'next' && nextSection.length && !isModal) {
    scrollTo(`.${nextSection[0].classList[0]}`);
  }
  if (dir === 'prev' && prevSection.length && !isModal) {
    scrollTo(`.${prevSection[0].classList[0]}`);
  }
};

$(window).on('wheel', e => {
  const deltaY = e.originalEvent.deltaY;
  if (deltaY > 0 && !inScroll) {
    scrollDirection('next');
  } else if (deltaY < 0 && !inScroll) {
    scrollDirection('prev');
  }
});

$(window).on('keydown', e => {
  const next = 40;
  const prev = 38;
  const tagName = e.target.tagName.toLowerCase();

  if (tagName !== 'input' && tagName !== 'textarea') {

    if (e.keyCode == next && !inScroll) {
      scrollDirection('next');
    } else if (e.keyCode == prev && !inScroll) {
      scrollDirection('prev');
    }
  }
})

const md = new MobileDetect(window.navigator.userAgent);
const isMobile = md.mobile() || md.tablet();

if (isMobile) {
  $(".wrapper").swipe({
    swipe: function (event, direction) {
      if (direction == 'up')
        scrollDirection('next');
      else if (direction == 'down')
        scrollDirection('prev');
    }
  });
}