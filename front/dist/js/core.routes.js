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
    var tweetState;
    var streamState;

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

    tweetState = {
      name: 'tweet',
      url: '/tweet/:tweetId',
      controller: 'TweetController',
      controllerAs: 'vm',
      templateUrl: 'tweet.html',
    };

    streamState = {
      name: 'stream',
      url: '/stream',
      controller: 'StreamController',
      controllerAs: 'vm',
      templateUrl: 'stream.html',
    };

    $stateProvider
      .state(userState)
      .state(homeState)
      .state(tweetState)
      .state(streamState);

    $urlRouterProvider.otherwise('/');
  }

  /* @ngInject */
  function run() {}
})();
