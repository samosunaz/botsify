(function() {
  'use strict';

  HomeController.$inject = ['$state', 'api'];
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
