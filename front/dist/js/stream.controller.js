(function() {
  'use strict';

  StreamController.$inject = ['$state'];
  angular
    .module('botsifyApp.core')
    .controller('StreamController', StreamController);

  /* @ngInject */
  function StreamController($state) {
    var vm = this;

    activate();

    //////////////////

    function activate() {
      var namespace = '/stream_tweets';
      var socket = io.connect('http://192.168.0.3:5000' + namespace);
      socket.on('stream_channel', function(data) {
        console.log(data);
      });
    }
  }
})();
