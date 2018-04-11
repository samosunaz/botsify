(function() {
  'use strict';

  angular
    .module('botsifyApp.core')
    .controller('HomeController', HomeController);

  /* @ngInject */
  function HomeController($state, api) {
    var vm = this;

    activate();

    vm.accountId = '';
    
    //////////////////

    function activate() {
      
    }
  }
})();
