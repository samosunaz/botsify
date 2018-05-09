(function () {
  'use strict';

  angular.module('botsifyApp.core').factory('api', api);

  /* @ngInject */
  function api($http, $q, API_URL) {
    var service = {
      getUser: getUser,
      getRepeatedWords: getRepeatedWords,
      getTimeline: getTimeline,
      getTweets: getTweets,
      getHashtags: getHashtags
    };

    return service;

    ////////////////

    function successCallback(response) {
      return response;
    }

    function errorCallback(error) {
      return $q.reject(error);
    }

    function getUser(userId) {
      return $http
        .get(API_URL + '/' + userId + '/details')
        .then(successCallback)
        .catch(errorCallback);
    }

    function getRepeatedWords(userId) {
      return $http
        .get(API_URL + '/' + userId + '/words')
        .then(successCallback)
        .catch(errorCallback);
    }

    function getTimeline(userId) {
      return $http
        .get(API_URL + '/' + userId + '/mentions')
        .then(successCallback)
        .catch(errorCallback);
    }

    function getTweets(userId) {
      return $http
        .get(API_URL + '/' + userId + '/tweets')
        .then(successCallback)
        .catch(errorCallback);
    }

    function getHashtags(userId) {
      return $http
        .get(API_URL + '/' + userId + '/hashtags')
        .then(successCallback)
        .catch(errorCallback);
    }
  }
})();
