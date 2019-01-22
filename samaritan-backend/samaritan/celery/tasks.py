import os

from samaritan import app
from samaritan.celery import make_celery

app.config.update(
    CELERY_BROKER_URL=os.getenv('BROKER_URI'),
    CELERY_RESULT_BACKEND=os.getenv('BROKER_URI')
)

celery = make_celery(app)

@celery.task()
def test(a, b):
    return a+b