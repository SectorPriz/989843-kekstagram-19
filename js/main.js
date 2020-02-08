'use strict';


// Cоздадим массив комментариев

var COMMENTS = [];
var commentsNumber = 6;
for (i = 0; i < commentsNumber; i++) {
  COMMENTS.push({
    avatar: 'img/avatar-6.svg',
    message: 'В целом всё неплохо. Но не всё.',
    name: 'Артем'
  });
}

// Получаем массив случайных фотографий (ПОКА С ВОЗМОЖНОСТЬЮ ПОВТОРЕНИЯ)

var PHOTO = [];
var photoNumber = 25;
var getRandomPhoto = function () {
  return Math.floor(Math.random() * (25) + 1);
};
for (i = 0; i <= photoNumber; i++) {
  PHOTO.push('photos/' + getRandomPhoto() + '.jpg');
}

// Получаем случайное число лайков в диапазоне от 15 до 250

var getRandomLikes = function () {
  return Math.floor(Math.random() * (250 - 15) + 1) + 15;
};

// Создал массив для визуального отображения (примера)

var PICTURES = [];
var picturesNumber = 25;
for (var i = 0; i < picturesNumber; i++) {
  PICTURES.push({
    url: PHOTO[i],
    description: 'описание фотографии',
    likes: getRandomLikes(),
    comments: COMMENTS.length
  });
}

// Находим секцию куда будем добавлять  объекты (картинки)

var similarPictureElement = document.querySelector('.pictures');

// Находим секцию откуда берем шаблон (копируем содержимое template)

var similarPictureTemplate = document.querySelector('#picture')
    .content
    .querySelector('.picture');

// Копируем данные в объект

var renderPicture = function (picture) {
  var pictureElement = similarPictureTemplate.cloneNode(true);

  pictureElement.querySelector('.picture__img').src = picture.url;
  pictureElement.querySelector('.picture__img').alt = picture.description;
  pictureElement.querySelector('.picture__likes').textContent = picture.likes;
  pictureElement.querySelector('.picture__comments').textContent = picture.comments;

  return pictureElement;
};

// Создаем фрагмент и отрисовываем в нем массив pictures

var fragment = document.createDocumentFragment();
for (i = 0; i < PICTURES.length; i++) {
  fragment.appendChild(renderPicture(PICTURES[i]));
}

similarPictureElement.appendChild(fragment);
