(function() {
  'use strict';

  api.$inject = ['$http', '$q', 'API_URL'];
  angular.module('botsifyApp.core').factory('api', api);

  /* @ngInject */
  function api($http, $q, API_URL) {
    var service = {
      getUser: getUser,
    };

    return service;

    ////////////////

    function successCallback(response) {
      console.log(response);
      return response;
    }

    function errorCallback(error) {
      console.log(error);
      return $q.reject(error);
    }

    function getUser(userId) {
      return $http
        .get(API_URL + '/' + userId + '/details')
        .then(successCallback)
        .catch(errorCallback);
    }
  }
})();
