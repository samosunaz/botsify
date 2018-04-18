(function() {
  'use strict';

  config.$inject = ['$stateProvider', '$urlRouterProvider'];
  angular
    .module('botsifyApp')
    .config(config)
    .run(run);

  /* @ngInject */
  function config($stateProvider, $urlRouterProvider) {
    var homeState;
    var userState;

    homeState = {
      name: 'home',
      url: '/',
      controller: 'HomeController',
      controllerAs: 'vm',
      templateUrl: 'home.html',
    };

    userState = {
      name: 'user',
      url: '/user/:userId',
      controller: 'UserController',
      controllerAs: 'vm',
      templateUrl: 'user.html',
    };

    $stateProvider.state(userState).state(homeState);

    $urlRouterProvider.otherwise('/');
  }

  /* @ngInject */
  function run() {}
})();
