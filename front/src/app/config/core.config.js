(function() {
  'use strict';

  angular
    .module('botsifyApp')
    .config(config)
    //.constant('API_URL', 'http://localhost:5000')
    .constant('API_URL', 'http://192.168.0.3:5000')
    .run(run);

  /* @ngInject */
  function config($httpProvider, $locationProvider) {
    $locationProvider.html5Mode({
      enabled: true,
      requireBase: true,
    });
  }

  /* @ngInject */
  function run() {}
})();
