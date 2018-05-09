import tweepy
import json
import db_manager
import language_detector
from flask_socketio import emit


class BotsifyStreamListener(tweepy.StreamListener):
    def __init__(self):
        pass

    def on_data(self, data):
        try:
            decoded = json.loads(data)
            if decoded['text'][:2] != 'RT' and decoded["lang"] == 'es':
                text = decoded["text"]
        except:
            pass
        return True

    def on_error(self, status_code):
        if status_code == 420:
            # returning False in on_data disconnects the stream
            return False
