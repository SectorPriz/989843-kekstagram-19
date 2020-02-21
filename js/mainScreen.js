'use strict';

(function () {

  var PICTURES_NUMBER = 25;
  var PHOTO_NUMBER = 25;

  // Функция для получения рандомного числа лайков в диапазоне от 15 до 250

  var getRandomLikes = function () {
    return Math.floor(Math.random() * (250 - 15) + 1) + 15;
  };

  // Получаем массив номеров фотографий
  var numbersPhotos = [];
  for (i = 1; i <= PHOTO_NUMBER; i++) {
    numbersPhotos.push(i);
  }

  // Массив фотографий
  var pictures = [];
  for (var i = 0; i < PICTURES_NUMBER; i++) {
    pictures.push({
      url: 'photos/' + numbersPhotos[i] + '.jpg',
      description: 'описание фотографии',
      likes: getRandomLikes(),
      comments: window.util.randomNumber(window.comments.commentsNumber)
    });
  }

  // Блок куда будем добавлять объекты (картинки)

  var similarPictureElement = document.querySelector('.pictures');

  // Блок откуда берем шаблон (копируем содержимое template)

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

  // Создаем фрагмент и отрисовываем массив в .pictures

  var fragment = document.createDocumentFragment();
  for (i = 0; i < pictures.length; i++) {
    fragment.appendChild(renderPicture(pictures[i]));
  }

  similarPictureElement.appendChild(fragment);

})();
