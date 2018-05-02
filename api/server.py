from flask import Flask, jsonify, make_response, request
from flask_cors import CORS, cross_origin
from twitter_api import twitter_setup
import language_processor as lp
import json
import analyzer

extractor = twitter_setup()

app = Flask(__name__)
CORS(app)


@app.route('/<string:account_id>/details', methods=['GET'])
def details(account_id):
    user = extractor.get_user(account_id)
    return jsonify(user)


@app.route('/<string:user_id>/mentions', methods=['GET'])
def get_timeline(user_id):
    mentions = dict()
    timeline = extractor.user_timeline(id=user_id, count=1000)
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


@app.route('/<string:user_id>/tweets/locations')
def get_locations(user_id):
    locations = list()
    timeline = extractor.user_timeline(id=user_id, count=100)
    for status in timeline:
        locations.append(status)
    return jsonify(locations)


@app.route('/<string:user_id>/tweets', methods=['GET'])
def clear_tweets(user_id):
    repeated_words = dict()
    timeline = extractor.user_timeline(id=user_id, count=100)
    for status in timeline:
        for word in analyzer.clear_tweet(status["text"]):
            print(word)
            if word in repeated_words:
                repeated_words[word] += 1
            else:
                repeated_words[word] = 1
    return jsonify(repeated_words)


@app.route('/<string:user_id>/words', methods=['GET'])
def get_repeated_words(user_id):
    repeated_words = dict()
    timeline = extractor.user_timeline(id=user_id, count=100)
    for status in timeline:
        for word in analyzer.clear_tweet(status["text"]):
            print(word)
            if word in repeated_words:
                repeated_words[word] += 1
            else:
                repeated_words[word] = 1
    return jsonify(repeated_words)


if __name__ == '__main__':
    app.config['JSON_AS_ASCII'] = False
    app.run(host='192.168.0.6', port=5000, debug=True)
