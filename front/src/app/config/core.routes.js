(function() {
    'use strict';

    angular
        .module('botsifyApp')
        .config(config)
        .run(run);

    function config($stateProvider, $urlRouterProvider) {
        var homeState;
        homeState = {
            name: 'home',
            url: '/',
            controller: 'HomeController',
            controllerAs: 'vm'
            templateUrl: './../home/home.html',
        };

        $stateProvider.state(homeState);

        $urlRouterProvider.otherwise('/');
    }

    function run() {}
})();
