'use strict';

// Создадем массив имен комментаторов

var NAME_COMMENTATORS = ['Артем', 'Алексей', 'Елена', 'Гарри', 'Артемида', 'Кощей'];

// Создаем функцию для получения рандомного индекса массива

var generateRandom = function (arr) {
  var rand = Math.floor(Math.random() * arr.length);
  return arr[rand];
};

// Cоздадем массив комментариев

var COMMENTS = [];
var commentsNumber = 6;
for (i = 0; i < commentsNumber; i++) {
  COMMENTS.push({
    avatar: 'img/avatar-6.svg',
    message: 'В целом всё неплохо. Но не всё.',
    name: generateRandom(NAME_COMMENTATORS)
  });
}

// Получаем массив случайных фотографий (посмотри вникни!!!!(для себя))

var RANDOM_NUMBER_PHOTO = [];
var ORDERED_NUMBER_PHOTO = [];
var photoNumber = 25;
var getRandomIndex = function (maxNumber) {
  return Math.floor(Math.random() * maxNumber);
};

// Создаем цикл для получения массива с упорядоченными номерами фотографий

for (i = 1; i <= photoNumber; i++) {
  ORDERED_NUMBER_PHOTO.push(i);
}

// Создаем цикл для получения рандомного уникального индекса фотографии (как-то так)

for (i = 0; i < photoNumber; i++) {
  var maxIndexNumberCopy = ORDERED_NUMBER_PHOTO.length - 1;
  var rand = getRandomIndex(maxIndexNumberCopy);
  var numberPhoto = ORDERED_NUMBER_PHOTO[rand];
  ORDERED_NUMBER_PHOTO[rand] = ORDERED_NUMBER_PHOTO[maxIndexNumberCopy];
  ORDERED_NUMBER_PHOTO.pop();
  RANDOM_NUMBER_PHOTO.push(numberPhoto);
}

// Получаем случайное число лайков в диапазоне от 15 до 250

var getRandomLikes = function () {
  return Math.floor(Math.random() * (250 - 15) + 1) + 15;
};

// Создаем массив фотографий в рандомном порядке

var PICTURES = [];
var picturesNumber = 25;
for (var i = 0; i < picturesNumber; i++) {
  PICTURES.push({
    url: 'photos/' + RANDOM_NUMBER_PHOTO[i] + '.jpg',
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

// Создаем фрагмент и отрисовываем массив в .pictures

var fragment = document.createDocumentFragment();
for (i = 0; i < PICTURES.length; i++) {
  fragment.appendChild(renderPicture(PICTURES[i]));
}

similarPictureElement.appendChild(fragment);
