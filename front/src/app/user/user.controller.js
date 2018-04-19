(function () {
  'use strict';

  angular
    .module('botsifyApp.core')
    .controller('UserController', UserController);

  /* @ngInject */
  function UserController($state, $stateParams, api) {
    var vm = this;

    activate();

    vm.style = function () {
      return {
        "color": "#" + vm.user.profile_link_color,
      }
    }

    vm.background = function () {
      return {
        "background-color": "#" + vm.user.profile_link_color,
      }
    }

    vm.user = {
      "contributors_enabled": false,
      "created_at": "Mon Dec 27 00:18:52 +0000 2010",
      "default_profile": false,
      "default_profile_image": false,
      "description": "awkward and weird\ud83d\udc69\ud83c\udffb\u200d\ud83d\udcbb",
      "entities": {
        "description": {
          "urls": []
        }
      },
      "favourites_count": 1654,
      "follow_request_sent": false,
      "followers_count": 653,
      "following": true,
      "friends_count": 392,
      "geo_enabled": true,
      "has_extended_profile": true,
      "id": 230883160,
      "id_str": "230883160",
      "is_translation_enabled": false,
      "is_translator": false,
      "lang": "en",
      "listed_count": 8,
      "location": "Sinaloa, Mexico",
      "name": "Julia",
      "notifications": false,
      "profile_background_color": "050505",
      "profile_background_image_url": "http://pbs.twimg.com/profile_background_images/539509909000159232/NtYWsW4o.jpeg",
      "profile_background_image_url_https": "https://pbs.twimg.com/profile_background_images/539509909000159232/NtYWsW4o.jpeg",
      "profile_background_tile": false,
      "profile_banner_url": "https://pbs.twimg.com/profile_banners/230883160/1516076250",
      "profile_image_url": "http://pbs.twimg.com/profile_images/979759865655644160/GE9ej_Iv_normal.jpg",
      "profile_image_url_https": "https://pbs.twimg.com/profile_images/979759865655644160/GE9ej_Iv_normal.jpg",
      "profile_link_color": "19CF86",
      "profile_location": null,
      "profile_sidebar_border_color": "000000",
      "profile_sidebar_fill_color": "0A54F5",
      "profile_text_color": "FCFCFC",
      "profile_use_background_image": true,
      "protected": false,
      "screen_name": "juliapaola_",
      "status": {
        "contributors": null,
        "coordinates": null,
        "created_at": "Tue Apr 17 21:46:05 +0000 2018",
        "entities": {
          "hashtags": [],
          "symbols": [],
          "urls": [],
          "user_mentions": [
            {
              "id": 110023039,
              "id_str": "110023039",
              "indices": [
                0,
                14
              ],
              "name": "Alejandro Barba",
              "screen_name": "_AlejandroBrb"
            },
            {
              "id": 375943027,
              "id_str": "375943027",
              "indices": [
                15,
                29
              ],
              "name": "Maximiliano Contreras",
              "screen_name": "maxcontrerasg"
            }
          ]
        },
        "favorite_count": 0,
        "favorited": false,
        "geo": null,
        "id": 986360171529228289,
        "id_str": "986360171529228289",
        "in_reply_to_screen_name": "_AlejandroBrb",
        "in_reply_to_status_id": 986342303689211904,
        "in_reply_to_status_id_str": "986342303689211904",
        "in_reply_to_user_id": 110023039,
        "in_reply_to_user_id_str": "110023039",
        "is_quote_status": false,
        "lang": "es",
        "place": null,
        "retweet_count": 0,
        "retweeted": false,
        "source": "<a href=\"http://twitter.com\" rel=\"nofollow\">Twitter Web Client</a>",
        "text": "@_AlejandroBrb @maxcontrerasg No te dio cr\u00e9ditos por la foto",
        "truncated": false
      },
      "statuses_count": 13354,
      "time_zone": "Pacific Time (US & Canada)",
      "translator_type": "none",
      "url": null,
      "utc_offset": -25200,
      "verified": false
    }

    function mostFrequentWords() {
      var data = {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
        series: [
          [5, 2, 4, 2, 0]
        ]
      };
      new Chartist.Bar('.ct-chart-words', data);
    }

    function activate() {
      api
        .getUser($stateParams.userId)
        .then(getUserComplete)
        .catch(getUserFailed);

      api
        .getRepeatedWords($stateParams.userId)
        .then(getRepeatedComplete)
        .catch(getUserFailed);

      function getUserComplete(response) {
        console.log(response);
        //vm.user = response.data;
        //getUserTheme();
      }

      function getRepeatedComplete(response) {
        console.log(response);
        //vm.user = response.data;
        //getUserTheme();
      }

      function getUserFailed(error) {
        console.log(error);
      }

      mostFrequentWords();

      ///

    }
  }
})();

/**
 * Variables
 * sentiment analysis (muy positivas y/o negativas) 1 positiva, 0 negativa
 * tiempo de respuesta
 */
