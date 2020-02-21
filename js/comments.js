'use strict';

(function () {

  var COMMENTS_NUMBER = 6;
  var AVATAR_NAMBER = 6;

  var nameOfCommentators = ['Артем', 'Алексей', 'Елена', 'Гарри', 'Артемида', 'Кощей'];
  var commentsMessage = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

  var comments = [];
  for (var i = 0; i < window.util.randomNumber(COMMENTS_NUMBER); i++) {
    comments.push({
      avatar: 'img/avatar-' + window.util.randomNumber(AVATAR_NAMBER) + '.svg',
      message: window.util.randomIndex(commentsMessage) + ', ' + window.util.randomIndex(commentsMessage),
      name: window.util.randomIndex(nameOfCommentators)
    });
  }

  // ЭКСПОРТ

  window.comments = {
    commentsNumber: COMMENTS_NUMBER
  };

})();
