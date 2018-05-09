(function () {
  'use strict';

  HomeController.$inject = ['$state', 'api', '$localStorage'];
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
