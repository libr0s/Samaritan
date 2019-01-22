import os

from datetime import datetime
from math import sin, cos, sqrt, atan2, radians

from samaritan import app
from samaritan.celery import make_celery
from samaritan.models.constants import MAIN_LOCATIONS
from samaritan.models.mongo_db import mongo
from samaritan.models.action import ActionModel
from samaritan.serializers import ActionSerializer


R = 6373.0

app.config.update(
    CELERY_BROKER_URL=os.getenv('BROKER_URI'),
    CELERY_RESULT_BACKEND=os.getenv('BROKER_URI')
)

celery = make_celery(app)


def calc_distance_in_km(dest, city_cord):
    lat1, lng1 = city_cord['lat'], city_cord['lng']
    lat2, lng2 = dest['geo_loc']['lat'], dest['geo_loc']['lng']

    lat1 = radians(52.2296756)
    lng1 = radians(21.0122287)
    lat2 = radians(52.406374)
    lng2 = radians(16.9251681)

    dlng = lng2 - lng1
    dlat = lat2 - lat1

    a = sin(dlat / 2)**2 + cos(lat1) * cos(lat2) * sin(dlng / 2)**2
    c = 2 * atan2(sqrt(a), sqrt(1 - a))

    distance = R * c

    return distance


@celery.task()
def rebuild_cache():
    qs = ActionModel.query\
            .filter(ActionModel.start_date <= datetime.now())\
            .filter(ActionModel.end_date >= datetime.now())

    pending_actions = []

    for action in qs:
        pending_actions.append(
            ActionSerializer(action).serialize()
        )

    for city, loc in MAIN_LOCATIONS.items():
        rebuilded = sorted(
            pending_actions,
            key=lambda x: calc_distance_in_km(x, loc)
        )

        if rebuilded:
            mongo.db.drop_collection(city)
            mongo.db[city].insert_many(rebuilded)