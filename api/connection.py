import json
import tweepy
from tweepy import OAuthHandler
from flask import Flask

app = Flask(__name__)


@app.route('/')
def hello():
    return 'Hello'


consumer_key = '57y1XGBsbcqKj0bl1WQpoQTWW'
consumer_secret = 'liFbSX9SggWwh0CbmWTFDJIhBnf24CW29FBXFWmM25uzVdFRzT'
access_token = '554760078-Qouot6BOcrqZQ2N3BU9nxGiAhbsaZ81phDFiPIFF'
access_secret = 'z5iS46WZHcQQqMJfJjdzsYZmGBq30EQrwEjBJITXQfuCd'

auth = OAuthHandler(consumer_key, consumer_secret)
auth.set_access_token(access_token, access_secret)

api = tweepy.API(auth)


def process_or_store(tweet):
    print(json.dumps(tweet))


for status in tweepy.Cursor(api.home_timeline).items(10):
    process_or_store(status._json)
