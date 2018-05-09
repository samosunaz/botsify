import language_processor


def is_irrelevant(word):
    if "http" in word:
        return True
    elif "rt" == word:
        return True
    else:
        return False


def clear_tweet(tweet):
    return language_processor.clear_text(tweet)
