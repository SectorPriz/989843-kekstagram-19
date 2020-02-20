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
    message: generateRandomIndex(commentsMessage),
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

// НАЧНЕМ РАБОТАТЬ С ФОРМОЙ РЕДАКТИРОВАНИЯ ФОТОГРАФИЙ

// Поле выбора файла
var uploadInput = document.querySelector('#upload-file');
// Форма редактирования изображения
var editForm = document.querySelector('.img-upload__overlay');
// Кнопка закрытия формы редактирования изображения
var editFormCancel = document.querySelector('#upload-cancel');
//
var imgUploadForm = document.querySelector('.img-upload__form');
imgUploadForm.setAttribute('action', 'https://js.dump.academy/kekstagram');

// Обработчик нажатия клавиши Escape на клавиатуре

var onEditFormEscPress = function (evt) {
  if (evt.key === 'Escape') {
    closeForm();
  }
};

// Открытие формы - удаляем .hidden
// добавляем обработчик нажатия Escape

var openForm = function () {
  editForm.classList.remove('hidden');
  document.addEventListener('keydown', onEditFormEscPress);
};

// Закрытие формы - возвращаем .hidden
// удаляем обработчик нажатия Escape

var closeForm = function () {
  editForm.classList.add('hidden');
  document.removeEventListener('keydown', onEditFormEscPress);
  imgUploadForm.reset();
  resetFilterForm();
};

// Открываем форму по событю change на поле добавления фотографии

uploadInput.addEventListener('change', function () {
  openForm();
});

// закрываем форму по клику на кнопку закрытия "X"

editFormCancel.addEventListener('click', function () {
  closeForm();
  resetFilterForm();
});

// РАБОТА С ХЕШТЕГАМИ

var hashtagInput = document.querySelector('.text__hashtags');

var validateHashtags = function (value) {
  var MIN_LENGTH_HASHTAGS = 2;
  var MAX_LENGTH_HASHTAGS = 20;
  var MAX_HASHTAGS = 5;
  var errorMessage = '';

  value = value.toLowerCase();
  var hashtags = value.split(/\s+/g);

  if (hashtags.length > MAX_HASHTAGS) {
    errorMessage += 'нельзя указать больше пяти хэш-тегов.\n';
  }

  for (i = 0; i < hashtags.length; i++) {
    if (hashtags[i].length > MAX_LENGTH_HASHTAGS) {
      errorMessage += 'Максимальная длина одного хэш-тега 20 символов, включая решётку.\n';
      break;
    }
    if (hashtags[i][0] !== '#') {
      errorMessage += 'Хэш-тег должен начинаться с символа "#".\n';
      break;
    }
    if (hashtags[i].length < MIN_LENGTH_HASHTAGS + 1) {
      errorMessage += 'После символа "#" минимум ' + MIN_LENGTH_HASHTAGS + ' знака.\n';
      break;
    }
    if (hashtags[0].indexOf('#', 1) >= 0) {
      errorMessage += 'Хэш-теги разделяются пробелами.\n';
      break;
    }
  }
  for (i = 0; i < hashtags.length - 1; i++) {
    if (~hashtags.indexOf(hashtags[i], i + 1)) {
      errorMessage += 'Один и тот же хэш-тег не может быть использован дважды.\n';
      break;
    }
  }
  if (errorMessage) {
    hashtagInput.setCustomValidity(errorMessage);
  } else {
    hashtagInput.setCustomValidity('');
    hashtagInput.style.border = '';
  }
};

hashtagInput.addEventListener('input', function () {
  validateHashtags(hashtagInput.value);
});

hashtagInput.addEventListener('focus', function () {
  document.removeEventListener('keydown', onEditFormEscPress);
});

hashtagInput.addEventListener('blur', function () {
  document.addEventListener('keydown', onEditFormEscPress);
});

// ФИЛЬТРЫ

var imgPreview = document.querySelector('.img-upload__preview');
var effectLvlPin = document.querySelector('.effect-level__pin');
var effectLvlDepth = document.querySelector('.effect-level__depth');
// var effectLvlLine = document.querySelector('.effect-level__line');
var effectNone = document.querySelector('.effects__preview--none');
var effectChrome = document.querySelector('.effects__preview--chrome');
var effectSepia = document.querySelector('.effects__preview--sepia');
var effectMarvin = document.querySelector('.effects__preview--marvin');
var effectPhobos = document.querySelector('.effects__preview--phobos');
var effectHeat = document.querySelector('.effects__preview--heat');

// При переключении эффектов, уровень насыщенности сбрасывается до
// начального значения (100%)

var resetFilterForm = function () {
  imgPreview.removeAttribute('style');
  effectLvlPin.removeAttribute('style');
  effectLvlDepth.removeAttribute('style');
};

var defaultValueToogle = function () {
  effectLvlPin.setAttribute('style', 'left:' + DEFAULT_VALUE_PERCENT + '%');
  effectLvlDepth.setAttribute('style', 'width:' + DEFAULT_VALUE_PERCENT + '%');
};

var DEFAULT_VALUE_PERCENT = 100;
var DEFAULT_VALUE_NUMBER = 3;

effectNone.addEventListener('click', function () {
  resetFilterForm();
});

effectChrome.addEventListener('click', function () {
  imgPreview.setAttribute('style', 'filter: grayscale(' + DEFAULT_VALUE_PERCENT + '%)');
  defaultValueToogle();
});

effectSepia.addEventListener('click', function () {
  imgPreview.setAttribute('style', 'filter: sepia(' + DEFAULT_VALUE_PERCENT + '%)');
  defaultValueToogle();
});

effectMarvin.addEventListener('click', function () {
  imgPreview.setAttribute('style', 'filter: invert(' + DEFAULT_VALUE_PERCENT + '%)');
  defaultValueToogle();
});

effectPhobos.addEventListener('click', function () {
  imgPreview.setAttribute('style', 'filter: blur(' + DEFAULT_VALUE_NUMBER + 'px)');
  defaultValueToogle();
});

effectHeat.addEventListener('click', function () {
  imgPreview.setAttribute('style', 'filter: brightness(' + DEFAULT_VALUE_NUMBER + ')');
  defaultValueToogle();
});
