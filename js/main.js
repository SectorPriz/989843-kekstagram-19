'use strict';

// Создал массив для визуального отображения (примера)

var pictures = [
  {
    url: 'photos/1.jpg',
    description: 'ajnj',
    likes: 10,
    comments: 10
  },
  {
    url: 'photos/1.jpg',
    description: 'ajnj',
    likes: 10,
    comments: 10
  }
];

// Секция куда будем добавлять картинки

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

// Создаем фрагмент и отрисовываем в нем массив pictures

var fragment = document.createDocumentFragment();
for (var i = 0; i < pictures.length; i++) {
  fragment.appendChild(renderPicture(pictures[i]));
}

similarPictureElement.appendChild(fragment);
