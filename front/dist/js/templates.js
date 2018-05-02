angular.module('botsifyApp').run(['$templateCache', function($templateCache) {$templateCache.put('home.html','<md-content><div id="menu-col"><div layout="row" flex><h2>Botsify</h2></div><div layout="row"><md-list><md-list-item ng-click="vm.toggleView(\'users\')"><p>Users</p></md-list-item><!--<md-list-item ng-click="vm.toggleView(\'tweets\')">\n          <p>Tweets</p>\n        </md-list-item>\n      </md-list>--></md-list></div></div><div id="main-home"><div layout="row"><div flex="100" class="col"><md-card><md-card-title><md-card-title-text><h2>{{vm.showUsers? \'Users\': \'Tweets\'}}</h2></md-card-title-text></md-card-title><md-divider></md-divider><md-card-content><div layout="row"><div flex="50"><div layout="row" style="padding-bottom: 0px"><div flex="35"><span>Analyze {{vm.showUsers? \'User\':\'Tweet\'}}</span></div></div><div layout="row" flex><input ng-if="vm.showUsers" placeholder="Username" ng-model="vm.accountId" type="text"> <input ng-if="vm.showTweets" placeholder="Tweet ID" ng-model="vm.tweetId" type="text"></div><div layout="row" flex><md-button ng-disabled="!vm.accountId" ng-if="vm.showUsers" class="md-primary" ui-sref="user({userId: vm.accountId})">Get statistics</md-button><md-button ng-disabled="!vm.tweetId" ng-if="vm.showTweets" class="md-primary" ui-sref="tweet({tweetId: vm.tweetId})">Get statistics</md-button></div></div><div flex="50"><md-content class="tweets-container" flex="100"><md-list flex><md-subheader class="md-no-sticky">Engagement Rate</md-subheader><md-list-item ng-repeat="user in vm.storage" ui-sref="user({userId: user.username})"><h4>{{ user.username }}</h4><p class="md-secondary" ng-class="{\'red\': user.influence <= 35, \'yellow\': user.influence > 35 && tweet.amount <= 70, \'green\':user.influence > 70 }">{{ user.engagement }}%</p></md-list-item></md-list></md-content></div></div></md-card-content></md-card></div></div></div></md-content>');
$templateCache.put('tweet.html','');
$templateCache.put('user.html','<md-content><div ng-if="!vm.loaded" style="width: 100%; height: 100%; z-index: 50; background-color: rgba(255,255,255,0.8); position: absolute;"><md-progress-circular md-mode="indeterminate"></md-progress-circular></div><div layout="column" class="user-profile"><div flex="20"><div layout="row" layout-align="center"><md-list-item class="md-3-line"><img class="md-avatar" src="{{ vm.user.profile_image_url }}"></md-list-item></div></div><div flex="30"><div layout="row"><md-list-item class="md-3-line"><div class="md-list-item-text"><h3>{{ vm.user.name }}</h3><h4><a ng-style="vm.style()" href="https://twitter.com/{{vm.user.screen_name}}">@{{ vm.user.screen_name }}</a></h4><p>{{ vm.user.description }}</p><p>{{ vm.user.location }}</p></div></md-list-item></div><md-divider></md-divider></div><div flex="40"><div layout="row" class="quick-numbers"><div flex="50"><h4>Favs</h4><span ng-style="vm.style()">{{ vm.user.favourites_count }}</span></div><div flex="50"><h4>Tweets</h4><span ng-style="vm.style()">{{ vm.user.statuses_count }}</span></div></div><div layout="row" class="quick-numbers"><div flex="50"><h4>Followers</h4><span ng-style="vm.style()">{{ vm.user.followers_count }}</span></div><div flex="50"><h4>Following</h4><span ng-style="vm.style()">{{ vm.user.friends_count }}</span></div></div></div><md-button class="md-primary" ui-sref="home()">Go back</md-button></div><div layout="row"><div flex="50" class="main-col col"><md-card><md-card-title><md-card-title-text><h2>Statistics<h4>Sample: {{vm.tweets.length}}</h4><div layout="row"><div flex="30"><h4>{{vm.tweetFrequency | number:2}} tweets per day</h4></div><div flex="30"><h4>{{vm.avgRt | number:2}} retweets per day</h4></div><div flex="30"><h4>{{vm.avgFvt | number:2}} likes per day</h4></div></div></h2></md-card-title-text></md-card-title></md-card><md-card><div layout="row"><div flex="40"><canvas id="words"></canvas><h4>Engagement: {{vm.engagementRate}}</h4></div><div flex="60"><div id="hashtags"></div></div></div></md-card><md-card class="tweets-card"><div layout="row"><h3>Top Tweets..</h3></div><div layout="row"><md-content class="tweets-container" flex="100"><md-list flex><md-list-item ng-repeat="tweet in vm.tweetsArray"><h4>{{ tweet.text }}</h4><p class="md-secondary blue" style="margin-right: 8px">{{ tweet.rt }}rts</p><p class="md-secondary blue">{{ tweet.likes }}likes</p></md-list-item></md-list></md-content></div></md-card><!--<md-card>\n        <div layout="row">\n          <h3>Something...</h3>\n        </div>\n        <div layout="row">\n          <canvas id="line"></canvas>\n        </div>\n      </md-card>--></div><div class="right-col col" flex="25"><md-card><div layout="row"><div flex="100"><h3>Most Frequent Words...</h3><canvas id="horizontal-words"></canvas></div></div></md-card><md-card><div layout="row"><div flex="100"><h3>Most Frequent Mentions...</h3><canvas id="horizontal-mentions"></canvas></div></div></md-card><md-card><md-card-content class="map-container" id="heatmap"></md-card-content></md-card></div></div></md-content>');}]);