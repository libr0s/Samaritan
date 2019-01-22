import os

from samaritan import app
from flask_pymongo import PyMongo


app.config['MONGO_URI'] = os.getenv('MONGO_URI')

mongo = PyMongo(app)