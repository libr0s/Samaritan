from flask import Flask
from flask_restful import Api

app = Flask(__name__)
app.config['SECRET_KEY'] = "klucz do wygenerowania"

from samaritan.models import auth
from samaritan.views import base

api = Api(app)
api.add_resource(auth.UserRegistration, '/registration')
