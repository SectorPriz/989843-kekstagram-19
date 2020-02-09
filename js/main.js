'use strict';

var comments = [];
var COMMENTS_NUMBER = 6;
var AVATAR_NAMBER = 6;
var pictures = [];
var PICTURES_NUMBER = 25;
var numbersPhotos = [];
var PHOTO_NUMBER = 25;
var nameOfCommentators = ['Артем', 'Алексей', 'Елена', 'Гарри', 'Артемида', 'Кощей'];
var commentsMessage = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

// Функция для получения рандомного индекса массива

var generateRandomIndex = function (arr) {
  var rand = Math.floor(Math.random() * arr.length);
  return arr[rand];
};

// Функция для получения рандомного числа

var getRandomNumber = function (number) {
  return Math.floor(Math.random() * number + 1);
};

// Функция для получения рандомного числа лайков в диапазоне от 15 до 250

var getRandomLikes = function () {
  return Math.floor(Math.random() * (250 - 15) + 1) + 15;
};

// Массив комментариев

for (i = 0; i < getRandomNumber(COMMENTS_NUMBER); i++) {
  comments.push({
    avatar: 'img/avatar-' + getRandomNumber(AVATAR_NAMBER) + '.svg',
    message: generateRandomIndex(commentsMessage) + ' ' + generateRandomIndex(commentsMessage),
    name: generateRandomIndex(nameOfCommentators)
  });
}

// Получаем массив номеров фотографий

for (i = 1; i <= PHOTO_NUMBER; i++) {
  numbersPhotos.push(i);
}

// Массив фотографий

for (var i = 0; i < PICTURES_NUMBER; i++) {
  pictures.push({
    url: 'photos/' + numbersPhotos[i] + '.jpg',
    description: 'описание фотографии',
    likes: getRandomLikes(),
    comments: getRandomNumber(COMMENTS_NUMBER)
  });
}

// Секция куда будем добавлять  объекты (картинки)

var similarPictureElement = document.querySelector('.pictures');

// Секция откуда берем шаблон (копируем содержимое template)

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
