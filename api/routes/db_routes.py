from flask import Blueprint

db_routes = Blueprint('db_routes', __name__)


@db_routes.route('/test_db')
def test():
    return "Si jala"
