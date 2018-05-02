(function () {
  'use strict';

  angular
    .module('botsifyApp')
    .config(config)
    .run(run);

  /* @ngInject */
  function config($stateProvider, $urlRouterProvider) {
    var homeState;
    var userState;
    var tweetState;

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

    $stateProvider.state(userState).state(homeState).state(tweetState);

    $urlRouterProvider.otherwise('/');
  }

  /* @ngInject */
  function run() { }
})();
