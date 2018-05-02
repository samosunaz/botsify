from langdetect import detect
import langid
import textblob


def langid_detect(sentence):
    try:
        return langid.classify(sentence)[0]
    except Exception as e:
        pass


def langdetect_detect(sentence):
    try:
        return detect(sentence)
    except Exception as e:
        pass


def textblob_detect(sentence):
    try:
        return textblob.TextBlob(sentence).detect_language()
    except Exception as e:
        pass


print(langdetect_detect("Hola, mi nombre es Samuel."))
