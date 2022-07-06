'use strict';
let player;
const playerStart = document.querySelector('.player__start');
const playerContainer = document.querySelector('.player');
const playerPlayControl = document.querySelector('.player__start');
const playerVolume = document.querySelector('.player__volume-icon');
const playerPlayBack = document.querySelector('.player__playback');
const playerVolumeBack = document.querySelector('.player__volume-playback');
const playerVolumeButton = document.querySelector('.player__volume-button');


function play() {
  if (playerContainer.classList.contains('play')) {
    playerContainer.classList.remove('play');
    playerPlayControl.children[0].setAttribute('xlink:href', 'icons/svg_sprite.svg#play');
    player.pauseVideo();
  } else {
    playerContainer.classList.add('play');
    playerPlayControl.children[0].setAttribute('xlink:href', 'icons/svg_sprite.svg#pause');
    player.playVideo();
  }
}

const eventInit = () => {
  playerStart.addEventListener('click', function () {
    play();
  });
  $('.player__splash').on('click', e => {
    play();
  });
  playerVolume.addEventListener('click', function () {
    playerContainer.classList.toggle('muted');
    if (playerContainer.classList.contains('muted')) {
      player.mute();
      playerVolume.style.fill = '#aaa';
    } else {
      player.unMute();
      playerVolume.style.fill = '#FFF';
    }
  });
  $('.player__playback').click(e => {
    const clickPos = e.originalEvent.layerX;
    let newPos = (player.getDuration() * clickPos) / getWidth(playerPlayBack);
    player.seekTo(newPos);
  });
  $('.player__volume-playback').click(e => {
    const clickPos = e.originalEvent.layerX;
    const percent = clickPos * 100 / getWidth(playerVolumeBack);
    playerVolumeBack.style.background = `linear-gradient(90deg, #e01f3d 0%, #e01f3d ${percent}%, #333 ${percent}%, #333 100%)`;
    playerVolumeButton.style.left = `${percent - 5}%`;
    player.setVolume(percent);
  });
};

function onPlayerStateChange(e) {
  playerContainer.classList.add('active');
  switch (e.data) {
    case 2:
      playerContainer.classList.remove('play');
      playerPlayControl.children[0].setAttribute('xlink:href', 'icons/svg_sprite.svg#play');
      break;
    case 1:
      playerContainer.classList.add('play');
      playerPlayControl.children[0].setAttribute('xlink:href', 'icons/svg_sprite.svg#pause');
      break;
  }
}

function onPlayerReady() {
  let interval;
  if (typeof interval !== 'undefined') {
    clearInterval(interval);
  }
  interval = setInterval(() => {
    let playerTime = player.getCurrentTime();
    let completePers = (playerTime * getWidth(playerPlayBack)) / player.getDuration();
    playerPlayBack.children[0].style.left = `${completePers}px`;
    playerPlayBack.style.background = `linear-gradient(90deg, #e01f3d 0%, #e01f3d ${completePers}px, #333 ${completePers}px, #333 100%)`;
  }, 1000);
  playerVolumeBack.style.background = '#e01f3d';
  playerVolumeButton.style.left = '100%';
}

function onYouTubeIframeAPIReady() {
  player = new YT.Player('yt-player', {
    height: '233',
    width: '394',
    videoId: 'V2i1YkfrM54',
    playerVars: {
      controls: 0,
      disablekb: 0,
      showinfo: 0,
      rel: 0,
      autoplay: 0,
      modestbranding: 0,
    },
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    },
  });
}

function getWidth(el) {
  return parseInt(window.getComputedStyle(el).width);
}

eventInit();