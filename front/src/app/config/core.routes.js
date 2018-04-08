(function() {
  'use strict';

  angular
    .module('botsifyApp')
    .config(config)
    .run(run);

  /* @ngInject */
  function config($stateProvider, $urlRouterProvider) {
    var homeState;
    homeState = {
      name: 'home',
      url: '/',
      controller: 'HomeController',
      controllerAs: 'vm',
      templateUrl: 'home.html',
    };

    $stateProvider.state(homeState);

    $urlRouterProvider.otherwise('/');
  }

  /* @ngInject */
  function run() {}
})();
