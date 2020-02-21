'use strict';

(function () {

  var DEFAULT_VALUE_PERCENT = 100;
  var DEFAULT_VALUE_NUMBER = 3;

  var imgPreview = document.querySelector('.img-upload__preview');
  var effectLvlPin = document.querySelector('.effect-level__pin');
  var effectLvlDepth = document.querySelector('.effect-level__depth');
  // var effectPreview = document.querySelector('.effects__preview');
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

  // ЭКСПОРТ

  window.filters = {
    resetFilterForm: function () {
      imgPreview.removeAttribute('style');
      effectLvlPin.removeAttribute('style');
      effectLvlDepth.removeAttribute('style');
    }
  };

})();
