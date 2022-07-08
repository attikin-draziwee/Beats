'use strict';

ymaps.ready(init);

function init() {
  const myMap = new ymaps.Map('map', {
    center: [61.26, 73.42],
    zoom: 13,
    controls: [],
  });
  const coords = [
    [61.277526, 73.365248],
    [61.267207, 73.386873],
    [61.259713, 73.423213],
    [61.260343, 73.414466]
  ];
  const collection = new ymaps.GeoObjectCollection({}, {
    draggable: false,
    iconLayout: 'default#image',
    iconImageHref: '../img/marker.svg',
    iconImageSize: [58, 73],
    iconImageOffset: [-29, -73],
  });

  coords.forEach((el) => {
    collection.add(new ymaps.Placemark(el));
  });
  myMap.behaviors.disable(['scrollZoom']);
  myMap.geoObjects.add(collection);

}