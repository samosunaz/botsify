from pymongo import MongoClient
client = MongoClient()

db = client.TWEETS_DB
tweets = db.tweets
users = db.users


def add_tweet(tweet):
    tweets.insert_one(tweet)


def get_tweets():
    documents = []
    cursor = tweets.find({})
    for document in cursor:
        document.pop('_id')
        documents.append(document)
    return documents


def get_tweet(tweet_id):
    cursor = tweets.find_one({"id": tweet_id})
    print(cursor)


def add_user(user):
    users.insert_one(user)


def get_user(user_id):
    return users.find_one({"user.screen_name": user_id})


def get_user_tweets(user_id):
    cursor = tweets.find({"user.screen_name": user_id})
    docs = []
    for doc in cursor:
        doc.pop('_id')
        docs.append(doc)
    return docs
