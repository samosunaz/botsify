(function() {
  'use strict';

  UserController.$inject = ['$state', '$stateParams', 'api'];
  angular
    .module('botsifyApp.core')
    .controller('UserController', UserController);

  /* @ngInject */
  function UserController($state, $stateParams, api) {
    var vm = this;

    activate();

    //////////////////

    function activate() {
      api
        .getUser($stateParams.userId)
        .then(getUserComplete)
        .catch(getUserFailed);

      function getUserComplete(response) {
        vm.user = response.data;
      }
      function getUserFailed(error) {
        console.log(error);
      }
    }
  }
})();
