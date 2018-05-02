(function () {
  'use strict';

  angular
    .module('botsifyApp.core')
    .controller('UserController', UserController);

  /* @ngInject */
  function UserController($state, $stateParams, api) {
    var vm = this;

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

    activate();

    vm.style = function () {
      return {
        "color": "#" + vm.user.profile_link_color,
      }
    }

    function initMap() {
      vm.map = new google.maps.Map(document.getElementById('heatmap'), {
        zoom: 11,
        center: { lat: 20.6737777, lng: -103.4054536 },
        mapTypeId: 'roadmap',
        radius: 300
      });

      var heatmap = new google.maps.visualization.HeatmapLayer({
        data: [new google.maps.LatLng(20.6737777, -103.4054536 )],
        map: vm.map
      });
    }

    function hexToR(h) { return parseInt(h.substring(0, 2), 16) }
    function hexToG(h) { return parseInt(h.substring(2, 4), 16) }
    function hexToB(h) { return parseInt(h.substring(4, 6), 16) }

    function setColorPallette() {
      var r = hexToR(vm.user.profile_link_color);
      var g = hexToG(vm.user.profile_link_color);
      var b = hexToB(vm.user.profile_link_color);

      var rgbColor = 'rgb(' + r + ',' + g + ',' + b + ',';
      vm.pallette = [
        rgbColor + '1)',
        rgbColor + '0.8)',
        rgbColor + '0.6)',
        rgbColor + '0.6)',
        rgbColor + '0.4)',
        rgbColor + '0.2)',
      ];
    }

    function mostFrequentWords() {
      var ctxWords = document.getElementById("words");
      var ctxHashtags = document.getElementById("hashtags");
      var options = {
        type: 'doughnut',
        data: {
          labels: ["Red", "Blue"],
          datasets: [{
            data: [80, 20],
            backgroundColor: [vm.pallette[0], vm.pallette[5]],
            borderWidth: 0
          }]
        },
        options: {
          cutoutPercentage: 80,
          scales: {
            xAxis: {
              gridLineWidth: 0
            },
            yAxis: {
              gridLineWidth: 0,
              minorTickInterval: null
            }
          },
          legend: {
            display: false
          }
        }
      }
      var wordsChart = new Chart(ctxWords, options);
      var hashtagsChart = new Chart(ctxHashtags, options);
    }

    function lineChart() {
      var ctxLine = document.getElementById("line");
      var options = {
        type: 'line',
        data: {
          labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
          datasets: [{
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: vm.pallette[4],
            borderWidth: 1,
            borderColor: vm.pallette[0],
          }]
        },
        options: {
          scales: {
            xAxes: [{
              gridLines: {
                display: false
              }
            }],
            yAxes: [{
              gridLines: {
                display: false
              }
            }]
          },
          legend: {
            display: false
          }
        }
      }
      var lineChart = new Chart(ctxLine, options);
    }

    function horizontalBarchart() {
      var ctxHorizontal = document.getElementById("horizontal");
      var options = {
        type: 'horizontalBar',
        data: {
          labels: ["Red", "Blue", "Yellow"],
          datasets: [{
            data: [12, 19, 3],
            backgroundColor: [vm.pallette[0], vm.pallette[2], vm.pallette[4]],
            borderWidth: 0
          }]
        },
        options: {
          scales: {
            xAxes: [{
              gridLines: {
                display: false,
                drawBorder: false
              },
              ticks: {
                display: false
              }
            }],
            yAxes: [{
              gridLines: {
                display: false,
                drawBorder: false
              },
              barPercentage: 0.4,
              categoryPercentage: 0.6
            }]
          },
          legend: {
            display: false
          }
        }
      }
      var horizontalBarchart = new Chart(ctxHorizontal, options);
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

      setColorPallette();
      mostFrequentWords();
      lineChart();
      horizontalBarchart();
      initMap();
      ///

    }
  }
})();

/**
 * Variables
 * sentiment analysis (muy positivas y/o negativas) 1 positiva, 0 negativa
 * tiempo de respuesta
 */
