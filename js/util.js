'use strict';

(function () {

  // ЭКСПОРТ

  window.util = {
    randomIndex: function (arr) {
      var rand = Math.floor(Math.random() * arr.length);
      return arr[rand];
    },
    randomNumber: function (number) {
      return Math.floor(Math.random() * number + 1);
    }
  };

})();
