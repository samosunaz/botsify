from credentials import *
import tweepy


def twitter_setup():
    auth = tweepy.OAuthHandler(TWITTER_CONSUMER_KEY, TWITTER_CONSUMER_SECRET)
    auth.set_access_token(TWITTER_ACCESS_TOKEN_KEY,
                          TWITTER_ACCESS_TOKEN_SECRET)
    api = tweepy.API(auth, parser=tweepy.parsers.JSONParser())
    return api
