from flask import Flask, jsonify, make_response, request
from flask_cors import CORS, cross_origin
from twitter_api import twitter_setup
import language_processor as lp
import json

extractor = twitter_setup()

app = Flask(__name__)
CORS(app)


@app.route('/<string:account_id>/details', methods=['GET'])
def get_tweets(account_id):
    user = extractor.get_user(account_id)
    return jsonify(user)


if __name__ == '__main__':
    app.run(debug=True)
