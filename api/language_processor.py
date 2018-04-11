import nltk


def tokenize(sentence):
  tokens = nltk.word_tokenize(sentence)
  return tokens