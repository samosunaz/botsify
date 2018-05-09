import tweepy
from flask import Blueprint
from flask import jsonify
from config import twitter_config
from config import BotsifyStreamListener
from urllib3.exceptions import ProtocolError
from threading import Thread
import analyzer
import time
import db_manager

extractor = twitter_config.twitter_setup()
thread = None

extractor = twitter_config.twitter_setup()

botsify_stream_listener = BotsifyStreamListener.BotsifyStreamListener()
botsify_stream = tweepy.Stream(
    auth=twitter_config.auth, listener=botsify_stream_listener)

twitter_routes = Blueprint('twitter_routes', __name__)


@twitter_routes.route('/<string:account_id>/details', methods=['GET'])
def details(account_id):
    user = extractor.get_user(account_id)
    print(user)
    return jsonify(user)


@twitter_routes.route('/<string:user_id>/mentions', methods=['GET'])
def get_timeline(user_id):
    mentions = dict()
    timeline = extractor.user_timeline(id=user_id, count=100)
    for status in timeline:
        for mention in status["entities"]['user_mentions']:
            user_id = mention["screen_name"]
            if user_id in mentions:
                mentions[user_id]["number_of_mentions"] += 1
            else:
                mentions[user_id] = dict()
                mentions[user_id]["number_of_mentions"] = 1
                mentions[user_id]["name"] = mention["name"]
    return jsonify(mentions)


@twitter_routes.route('/<string:user_id>/tweets', methods=['GET'])
def get_tweets(user_id):
    statuses = list()
    try:
        if len(db_manager.get_user_tweets(user_id)) > 0:
            for status in db_manager.get_user_tweets(user_id):
                statuses.append(status)
        else:
            timeline = extractor.user_timeline(id=user_id, count=100)
            for status in timeline:
                statuses.append(status)
    except tweepy.error.RateLimitError:
        time.sleep(60 * 15)
        pass
    return jsonify(statuses)


@twitter_routes.route('/tweets/<string:tweet_id>', methods=['GET'])
def get_locations(tweet_id):
    locations = list()
    retweets = extractor.retweets(id=tweet_id, count=100)
    try:
        for retweet in retweets:
            location = retweet["user"]["location"]
            locations.append(location)
    except tweepy.error.RateLimitError:
        time.sleep(60 * 15)
        pass
    return locations


@twitter_routes.route('/<string:user_id>/tweets/locations')
def get_locations_repeat(user_id):
    locations = dict()
    timeline = extractor.user_timeline(id=user_id, count=100)
    try:
        for status in timeline:
            tweet_locations = get_locations(status["id_str"])
            for location in tweet_locations:
                if location in locations:
                    locations[location] += 1
                else:
                    locations[location] = 1
    except tweepy.error.RateLimitError:
        time.sleep(60 * 15)
        pass
    return jsonify(locations)


@twitter_routes.route('/<string:user_id>/words', methods=['GET'])
def get_repeated_words(user_id):
    repeated_words = dict()
    if len(db_manager.get_user_tweets(user_id)) > 0:
        timeline = db_manager.get_user_tweets(user_id)
    else:
        timeline = extractor.user_timeline(id=user_id, count=100)
    for status in timeline:
        for word in analyzer.clear_tweet(status["text"]):
            if word in repeated_words:
                repeated_words[word] += 1
            else:
                if not analyzer.is_irrelevant(word):
                    repeated_words[word] = 1
    return jsonify(repeated_words)


@twitter_routes.route('/<string:user_id>/hashtags', methods=['GET'])
def get_hashtags(user_id):
    hashtags = dict()
    if len(db_manager.get_user_tweets(user_id)) > 0:
        timeline = db_manager.get_user_tweets(user_id)
    else:
        timeline = extractor.user_timeline(id=user_id, count=100)
    for status in timeline:
        for hashtag in status['entities']['hashtags']:
            if hashtag["text"] in hashtags:
                hashtags[hashtag["text"]] += 1
            else:
                hashtags[hashtag["text"]] = 1
    return jsonify(hashtags)


@twitter_routes.route('/<string:user_id>/tweets/mine', methods=['GET'])
def mine_tweets(user_id):
    current_page = 1
    while True:
        try:
            timeline = extractor.user_timeline(id=user_id, page=current_page)
            if timeline:
                for status in timeline:
                    status_dict = dict(status)
                    print(str(status_dict))
                    db_manager.add_tweet(status_dict)
            else:
                break
            current_page += 1
        except tweepy.error.RateLimitError:
            time.sleep(15 * 60)
            continue
        except tweepy.error.TweepError:
            break
