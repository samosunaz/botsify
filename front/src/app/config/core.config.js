(function() {
  'use strict';

  angular
    .module('botsifyApp')
    .config(config)
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
