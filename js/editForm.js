'use strict';

(function () {

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
    window.filters.resetFilterForm();
  };

  // Открываем форму по событю change на поле добавления фотографии

  uploadInput.addEventListener('change', function () {
    openForm();
  });

  // закрываем форму по клику на кнопку закрытия "X"

  editFormCancel.addEventListener('click', function () {
    closeForm();
    window.filters.resetFilterForm();
  });

  // ЭКСПОРТ

  window.editForm = {
    onEditFormEscPress: function (evt) {
      if (evt.key === 'Escape') {
        closeForm();
      }
    }
  };
})();
