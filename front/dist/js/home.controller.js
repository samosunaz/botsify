(function () {
  'use strict';

  HomeController.$inject = ['$state', 'api'];
  angular
    .module('botsifyApp.core')
    .controller('HomeController', HomeController);

  /* @ngInject */
  function HomeController($state, api) {
    var vm = this;

    vm.toggleView = function (view) {
      switch (view) {
        case 'users':
          vm.showTweets = false;
          vm.showUsers = true;
          break;
        case 'tweets':
          vm.showUsers = false;
          vm.showTweets = true;
          break;
      }
    }

    activate();

    //////////////////

    function activate() {
      vm.accountId = '';
      vm.tweetId = '';
      vm.showUsers = true;
      vm.showTweets = false;
    }
  }
})();
