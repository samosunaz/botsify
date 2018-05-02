import nltk
from nltk.corpus import stopwords
from nltk import word_tokenize
from nltk.data import load
from nltk.stem import SnowballStemmer
from string import punctuation
from sklearn.feature_extraction.text import CountVectorizer
from textblob import TextBlob

sp_stopwords = stopwords.words('spanish')
stemmer = SnowballStemmer('spanish')
non_words = list(punctuation)
non_words.extend(map(str, range(10)))


def stem_tokens(tokens, stemmer):
    stemmed = []
    for item in tokens:
        stemmed.append(stemmer.stem(item))
    return stemmed


def tokenize(sentence):
    text = ''.join([c for c in sentence if c not in non_words])
    tokens = word_tokenize(text)
    try:
        stems = stem_tokens(tokens, stemmer)
    except Exception as e:
        print(e)
        print(text)
        stems = ['']
    return stems


def clear_text(sentence):
    stop_words = set(nltk.corpus.stopwords.words('spanish'))
    tokens = tokenize(sentence)
    filtered_sentence = [w for w in tokens if not w in stop_words]
    return filtered_sentence


def analyze_sentiment(sentence):
    sentiment = TextBlob(clear_text(sentence))
    print(sentiment)
