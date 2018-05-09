(function () {
  'use strict';

  angular
    .module('botsifyApp.core')
    .controller('UserController', UserController);

  /* @ngInject */
  function UserController($state, $stateParams, api, $localStorage) {
    var vm = this;
    vm.loaded = false;
    vm.sample = [{ word: '', count: 0 }, { word: '', count: 0 }, { word: '', count: 0 }];
    vm.retweets = 0;
    vm.favorites = 0;
    vm.replies = 0;
    vm.locations = {};
    vm.hashtags = {};

    activate();

    function initTweetsArray() {
      vm.tweetsArray = []
      for (var i = 0; i < 10; i++) {
        vm.tweetsArray.push({text:'', rt:0, likes: 0});
      }

    }

    function storeData() {
      var storage = $localStorage.users;
      var equal = false;
      var obj = {
        username: vm.user.screen_name,
        engagement: vm.engagementRate
      }

      for(var i=0; i<storage.length; i++){
        var item = storage[i];
        if(item.username == obj.username){
          item.engagement = obj.engagement;
          equal =true;
          break;
        }
      }

      if(!equal){
        storage.push(obj);
      }
      $localStorage.users = storage;
    }

    function calculateInfluence() {
      var total = vm.tweets.length;
      total = vm.total;
      vm.avgRt = vm.retweets / total;
      vm.avgFvt = vm.favorites / total;
      vm.avgRpl = vm.replies / total;

      vm.engagementRate = ((vm.avgRt + vm.avgFvt*0.7) / (vm.user.followers_count*0.6) * 100).toFixed(2);
      mostFrequentWords();
      storeData();
    }

    function mapHashtags() {
      var hashtagsdArr = Object.keys(vm.hashtags);
      var words = [];
      hashtagsdArr.map(function (word) {
        var count = vm.hashtags[word];
        words.push({ text: word, weight: count });
      });
      $('#hashtags').jQCloud(words, {
        width: 350,
        height: 150
      });
    }

    function tweetFrequency() {
      var start = moment(new Date(vm.tweets[vm.tweets.length-1].created_at));
      var end = moment(new Date(vm.tweets[0].created_at));
      var diff = end.diff(start, 'days');
      vm.tweetFrequency = vm.total / diff;
    }

    function getHeatmapData() {
      vm.total =0;
      vm.heatmapData = [];
      var center, lat, lng, coords;
      initTweetsArray();
      vm.tweets.map(function (tweet) {
        if (tweet.place) {
          coords = tweet.place.bounding_box.coordinates[0];
          lng = (coords[0][0] + coords[1][0]) / 2;
          lat = (coords[1][1] + coords[2][1]) / 2;
          center = new google.maps.LatLng(lat, lng);
          vm.heatmapData.push(center);
        }
        if (!tweet.retweeted_status) {
          vm.total++;
          vm.retweets += tweet.retweet_count;
          vm.favorites += tweet.favorite_count;
          vm.replies += tweet.reply_count;

          for(var i=0; i<vm.tweetsArray.length; i++){
            var avg = (tweet.retweet_count+tweet.favorite_count)/2;
            var currAvg = (vm.tweetsArray[i].rt + vm.tweetsArray[i].likes)/2;
            if(avg >= currAvg){
              var newObj = {text: tweet.text, rt: tweet.retweet_count, likes: tweet.favorite_count};
              vm.tweetsArray.splice(i, 0, newObj);
              vm.tweetsArray = vm.tweetsArray.slice(0, vm.tweetsArray.length-1);
              break;
            }
          }
        }

      });
      initMap();
      calculateInfluence();
    }

    function mapRepeated() {
      vm.topWords = angular.copy(vm.sample);
      var repeatedArr = Object.keys(vm.repeated);
      repeatedArr.map(function (word) {
        var count = vm.repeated[word];
        for (var i = 0; i < vm.topWords.length; i++) {
          if (!vm.mentions[word] && word.length>2) {
            var curr = vm.topWords[i];
            if (count >= curr.count) {
              var newObj = { word: word, count: count };
              vm.topWords.splice(i, 0, newObj);
              vm.topWords = vm.topWords.slice(0, vm.topWords.length - 1);
              break;
            }
          }
        }

      });
      horizontalBarchart(vm.topWords, "horizontal-words");
    };

    function mapMentions() {
      vm.topMentions = angular.copy(vm.sample);
      var mentionsArr = Object.keys(vm.mentions);
      var normalized = {};
      mentionsArr.map(function (mention) {
        var count = vm.mentions[mention].number_of_mentions;
        normalized[mention.toLowerCase()] = vm.mentions[mention];
        for (var i = 0; i < vm.topMentions.length; i++) {
          var curr = vm.topMentions[i];
          if (count >= curr.count) {
            var newObj = { word: mention, count: count };
            vm.topMentions.splice(i, 0, newObj);
            vm.topMentions = vm.topMentions.slice(0, vm.topMentions.length - 1);
            break;
          }
        }
      });
      vm.mentions = normalized;
      horizontalBarchart(vm.topMentions, "horizontal-mentions");
      mapRepeated();
    }

    function initMap() {
      var center;
      if(vm.heatmapData[0]){
        center = {lat: vm.heatmapData[0].lat(), lng: vm.heatmapData[0].lng()}
      } else{
        center = { lat: 20.6737777, lng: -103.4054536 };
      }
      
      vm.map = new google.maps.Map(document.getElementById('heatmap'), {
        
        zoom: 5,
        center: center,
        mapTypeId: 'roadmap',
        radius: 300
      });

      var heatmap = new google.maps.visualization.HeatmapLayer({
        data: vm.heatmapData,
        map: vm.map
      });

      vm.loaded = true;
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
      var options = {
        type: 'doughnut',
        data: {
          labels: ["Engagement", ""],
          datasets: [{
            data: [vm.engagementRate, (100-vm.engagementRate).toFixed(2)],
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

    function horizontalBarchart(arrData, id) {
      var labels = [];
      var data = [];
      arrData.map(function (item) {
        labels.push(item.word);
        data.push(item.count);
      });
      var ctxHorizontal = document.getElementById(id);
      var options = {
        type: 'horizontalBar',
        data: {
          labels: labels,
          datasets: [{
            data: data,
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
                display: false,
                beginAtZero: true
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
          },
          responsive: true
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

      api
        .getTimeline($stateParams.userId)
        .then(getTimelineComplete)
        .catch(getUserFailed);

      api
        .getTweets($stateParams.userId)
        .then(getTweetsComplete)
        .catch(getUserFailed);

      api
        .getHashtags($stateParams.userId)
        .then(getHashtagsComplete)
        .catch(getUserFailed);

      function getUserComplete(response) {
        vm.user = response.data;
        setColorPallette();
        
        //lineChart();
        vm.style = function () {
          return {
            "color": "#" + vm.user.profile_link_color,
          }
        }
      }

      function getRepeatedComplete(response) {
        vm.repeated = response.data;

      }

      function getTimelineComplete(response) {
        vm.mentions = response.data;
        mapMentions();
      }

      function getTweetsComplete(response) {
        vm.tweets = response.data;
        getHeatmapData();
        tweetFrequency();
      }

      function getHashtagsComplete(response) {
        vm.hashtags = response.data;
        mapHashtags();
      }

      function getUserFailed(error) {
        console.log(error);
      }
      ///

    }
  }
})();

/**
 * Variables
 * sentiment analysis (muy positivas y/o negativas) 1 positiva, 0 negativa
 * tiempo de respuesta
 */
