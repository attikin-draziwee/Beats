'use strict';

const video = document.querySelector('.player__video');
const playerPlay = document.querySelector('.player__start').firstElementChild;
let interval;
const playerBar = document.querySelector('.player__playback');
const playerVolume = document.querySelector('.player__volume');

video.addEventListener('click', e => { setPlay(); });
playerPlay.parentNode.addEventListener('click', e => { setPlay(); });
playerVolume.addEventListener('click', e => {
  switch (true) {
    case e.target.classList.contains('player__volume-icon'):
      setMute(e.target, true);
      break;
    case e.target.parentNode.classList.contains('player__volume-icon'):
      setMute(e.target);
      break;
  }
});
$('.player__playback').on('click', function (e) {
  setTime(e, this, video);
});
$('.player__volume-playback').on('click', function (e) {
  setVolume(e, this, video);
});

function setTime(e, bar, video) {
  const clickPos = e.originalEvent.layerX;
  let newPos = (video.duration * clickPos) / getWidth(bar);
  video.currentTime = newPos;
}
function setVolume(e, bar, video) {
  const clickPos = e.originalEvent.layerX;
  let vol = clickPos / getWidth(bar);
  let percent = vol * 100;
  bar.style.background = `linear-gradient(90deg, #e01f3d 0%, #e01f3d ${percent}%, #333 ${percent}%, #333 100%)`;
  $('.player__volume-button').css({
    left: `${percent - 15}%`,
  });
  video.volume = vol < 0 ? 0 : vol;
}

function setPlay() {
  if (video.paused) {
    video.play();
    playerPlay.setAttribute('xlink:href', 'icons/svg_sprite.svg#pause');
    interval = setInterval(e => {
      updateBar(playerBar, video);
    }, 100);
  } else {
    video.pause();
    playerPlay.setAttribute('xlink:href', 'icons/svg_sprite.svg#play');
    clearInterval(interval);
  }
}

function setMute(el, isParent = false) {
  if (!video.muted) {
    video.muted = true;
    if (!isParent)
      el.style.fill = '#aaa';
    else
      el.firstElementChild.style.fill = '#aaa';
  } else {
    video.muted = false;
    if (!isParent)
      el.style.fill = '#FFF';
    else
      el.firstElementChild.style.fill = '#FFF';
  }
}

function updateBar(bar, video) {
  let videoCurrentTime = video.currentTime;
  let completePers = (videoCurrentTime * getWidth(bar)) / video.duration;
  bar.firstElementChild.style.left = `${completePers}px`;
  bar.style.background = `linear-gradient(90deg, #e01f3d 0%, #e01f3d ${completePers}px, #333 ${completePers}px, #333 100%)`;
}

function getWidth(el) {
  return parseInt(window.getComputedStyle(el).width);
}