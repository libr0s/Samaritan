from .db import db
from datetime import datetime

class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key = True)
    username = db.Column(db.String(120), unique = True, nullable = False)
    password = db.Column(db.String(120), nullable = False)
    date = db.Column(db.DateTime, default= datetime.now())

    def save_to_db(self):
        db.session.add(self)
        db.session.commit()

    @classmethod
    def find_by_username(self, username):
        return self.query.filter_by(username = username).first()

    @classmethod
    def get_users(self):

        def to_json(x):
            return {'id': x.id, 'username': x.username,'password': x.password,\
            'create_date': x.date.strftime('%Y-%m-%d')}

        return {'users': list(map(lambda x: to_json(x), User.query.all()))}
