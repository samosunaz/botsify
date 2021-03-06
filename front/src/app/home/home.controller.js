(function() {
  'use strict';

  angular
    .module('botsifyApp.core')
    .controller('HomeController', HomeController);

  /* @ngInject */
  function HomeController($state, api, $localStorage) {
    var vm = this;
    if(!$localStorage.users){
      $localStorage.users = []
    }
    vm.storage = $localStorage.users;

    vm.toggleView = function (view) {
      vm.accountId = '';
      vm.tweetId = '';
      switch (view) {
        case 'users':
          vm.showTweets = false;
          vm.showUsers = true;
          break;
        case 'tweets':
          vm.showUsers = false;
          vm.showTweets = true;
          break;
        case 'stream':
          vm.showUsers = false;
          vm.showTweets = false;
          vm.showStream = true;
          break;
      }
    };

    activate();

    //////////////////

    function activate() {
      vm.accountId = '';
      vm.tweetId = '';
      vm.showUsers = true;
      vm.showTweets = false;
      vm.showStream = false;
    }
  }
})();
