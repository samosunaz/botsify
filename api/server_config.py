from flask import Flask
from flask_cors import CORS, cross_origin
from flask_socketio import SocketIO, emit

from threading import Thread

from routes.db_routes import db_routes
from routes.twitter_routes import twitter_routes

app = Flask(__name__)
app.register_blueprint(db_routes)
app.register_blueprint(twitter_routes)
app.config['JSON_AS_ASCII'] = False
CORS(app)

if __name__ == '__main__':
    app.run(host="192.168.0.5", port=5000, debug=True)
