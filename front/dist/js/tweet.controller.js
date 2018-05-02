(function () {
    'use strict';
  
    TweetController.$inject = ['$state', 'api'];
    angular
      .module('botsifyApp.core')
      .controller('TweetController', TweetController);
  
    /* @ngInject */
    function TweetController($state, api) {
      var vm = this;
  
  
      activate();
  
      //////////////////
  
      function activate() {
      }
    }
  })();
  