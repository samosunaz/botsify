angular.module('botsifyApp').run(['$templateCache', function($templateCache) {$templateCache.put('home.html','<md-content><div id="menu-col"><div layout="row" flex><h2>Botsify</h2></div><div layout="row"><md-list><md-list-item ng-click="vm.toggleView(\'users\')"><p>Users</p></md-list-item><md-list-item ng-click="vm.toggleView(\'tweets\')"><p>Tweets</p></md-list-item></md-list></div></div><div id="main-home"><div layout="row"><div flex="100" class="col"><md-card><md-card-title><md-card-title-text><h2>{{vm.showUsers? \'Users\': \'Tweets\'}}</h2></md-card-title-text></md-card-title><md-divider></md-divider><md-card-content><div layout="row" style="padding-bottom: 0px"><div flex="35"><span>Analyze {{vm.showUsers? \'User\':\'Tweet\'}}</span></div></div><div layout="row" flex><input ng-if="vm.showUsers" placeholder="Username" ng-model="vm.accountId" type="text"> <input ng-if="vm.showTweets" placeholder="Tweet ID" ng-model="vm.tweetId" type="text"></div><div layout="row" flex><md-button ng-if="vm.showUsers" class="md-primary" ui-sref="user({userId: vm.accountId})">Get statistics</md-button><md-button ng-if="vm.showTweets" class="md-primary" ui-sref="tweet({tweetId: vm.tweetId})">Get statistics</md-button></div></md-card-content></md-card></div></div><div flex="60"><md-card></md-card></div></div></md-content>');
$templateCache.put('tweet.html','');
$templateCache.put('user.html','<md-content><div layout="column" class="user-profile"><div flex="20"><div layout="row" layout-align="center"><md-list-item class="md-3-line"><img class="md-avatar" src="{{ vm.user.profile_image_url }}"></md-list-item></div></div><div flex="20"><div layout="row"><md-list-item class="md-3-line"><div class="md-list-item-text"><h3>{{ vm.user.name }}</h3><h4><a ng-style="vm.style()" href="https://twitter.com/{{vm.user.screen_name}}">@{{ vm.user.screen_name }}</a></h4><p>{{ vm.user.description }}</p></div></md-list-item></div><md-divider></md-divider></div><div flex="50"><div layout="row" class="quick-numbers"><div flex="50"><h4>Tweets</h4><span ng-style="vm.style()">{{ vm.user.followers_count }}</span></div><div flex="50"><h4>Retweets</h4><span ng-style="vm.style()">{{ vm.user.followers_count }}</span></div></div><div layout="row" class="quick-numbers"><div flex="50"><h4>Followers</h4><span ng-style="vm.style()">{{ vm.user.followers_count }}</span></div><div flex="50"><h4>Following</h4><span ng-style="vm.style()">{{ vm.user.friends_count }}</span></div></div></div><md-button class="md-primary" ui-sref="home()">Go back</md-button></div><div layout="row"><div flex="50" class="main-col col"><md-card><md-card-title><md-card-title-text><h2>Statistics<i class="fa fa-smile"></i></h2></md-card-title-text></md-card-title></md-card><md-card><div layout="row"><div flex="50"><canvas id="words"></canvas><h4>Words</h4></div><div flex="50"><canvas id="hashtags"></canvas><h4>Hashtags</h4></div></div></md-card><md-card><div layout="row"><h3>Something...</h3></div><div layout="row"><canvas id="line"></canvas></div></md-card></div><div class="right-col col" flex="25"><md-card><div layout="row"><div flex="100"><h3>Something...</h3><canvas id="horizontal"></canvas></div></div></md-card><md-card><md-card-content class="map-container" id="heatmap"></md-card-content></md-card></div></div></md-content>');}]);