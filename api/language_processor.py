# -*- coding: UTF-8 -*-
import sys

import nltk
from nltk.corpus import stopwords
from nltk import word_tokenize
from nltk.data import load
from nltk.stem import SnowballStemmer
from nltk.tokenize import ToktokTokenizer
from string import punctuation
from sklearn.feature_extraction.text import CountVectorizer
from textblob import TextBlob

reload(sys)
sys.setdefaultencoding('utf8')

spanish_tokenizer = nltk.data.load('tokenizers/punkt/spanish.pickle')

sp_stopwords = stopwords.words('spanish')
stemmer = SnowballStemmer('spanish')
non_words = list(punctuation)
non_words.extend(['¿', '¡', '…', '—'])
non_words.extend(map(str, range(10)))
toktok = ToktokTokenizer()


def tokenize(sentence):
    text = ''.join([c for c in sentence if c not in non_words])
    tokens = toktok.tokenize(text.lower())
    return tokens


def clear_text(sentence):
    stop_words = set(nltk.corpus.stopwords.words('spanish'))
    tokens = tokenize(sentence)
    filtered_sentence = [w for w in tokens if not w in stop_words]
    return filtered_sentence


def analyze_sentiment(sentence):
    sentiment = TextBlob(clear_text(sentence))
    print(sentiment)
