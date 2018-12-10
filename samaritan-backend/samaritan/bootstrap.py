from samaritan.models.db import db

def bootstrap_db():
    db.reflect()
    db.drop_all()

    db.create_all()