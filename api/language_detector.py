from langdetect import detect
import langid
import textblob


def langid_detect(sentence):
    try:
        return langid.classify(sentence)[0]
    except Exception:
        pass


def langdetect_detect(sentence):
    try:
        return detect(sentence)
    except Exception:
        pass


def textblob_detect(sentence):
    try:
        return textblob.TextBlob(sentence).detect_language()
    except Exception:
        pass


def is_spanish_lang(sentence):
    return langid_detect(sentence) == 'es' or langdetect_detect(sentence) == 'es' or textblob_detect(sentence) == 'es'