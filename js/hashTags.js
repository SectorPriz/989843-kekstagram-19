'use strict';

(function () {

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

    for (var i = 0; i < hashtags.length; i++) {
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
    document.removeEventListener('keydown', window.comments.onEditFormEscPress);
  });

  hashtagInput.addEventListener('blur', function () {
    document.addEventListener('keydown', window.comments.onEditFormEscPress);
  });

})();
