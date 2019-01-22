from .db import db
from datetime import datetime
import enum
from passlib.hash import pbkdf2_sha256

class UserType(enum.Enum):
    def __str__(self):
        return str(self.value)

    organisation='organisation'
    volunteer='volunteer'


class LocationEnum(enum.Enum):

    def __str__(self):
        return str(self.value)

    WARSZAWA='WARSZAWA'
    WROCLAW='WROCLAW'
    GDANSK='GDANSK'
    KRAKOW='KRAKOW'
    LUBLIN='LUBLIN'
    BYDGOSZCZ='BYDGOSZCZ'


class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key = True)
    email = db.Column(db.String(120), unique = True, nullable = False)
    password = db.Column(db.String(128), nullable = False)
    date = db.Column(db.DateTime, default= datetime.now())
    type = db.Column(db.Enum(UserType))

    def save_to_db(self):
        db.session.add(self)
        db.session.commit()

    def hash_password(self,password):
        self.password = pbkdf2_sha256.hash(password)

    def verify_password(self,password):
        return pbkdf2_sha256.verify(password,self.password)

    @classmethod
    def find_by_email(self, email):
        return self.query.filter_by(email = email).first()

    @classmethod
    def get_users(self):
        def to_json(x):
            return {'id': x.id, 'email': x.email,'password': x.password,\
            'create_date': x.date.strftime('%Y-%m-%d')}
        return {'users': list(map(lambda x: to_json(x), User.query.all()))}

class Volunteer(db.Model):
    __tablename__ = 'volunteers'

    def __repr__(self):
        return self.name

    def __str__(self):
        return self.name

    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String(120), nullable = False)
    surname = db.Column(db.String(120), nullable = False)
    user = db.Column(db.ForeignKey(User.id))
    points = db.Column(db.Integer, default=0)
    rank = db.Column(db.String(120))
    location = db.Column(db.Enum(LocationEnum))

    def save_to_db(self):
        db.session.add(self)
        db.session.commit()

class Organisation(db.Model):
    __tablename__ = 'organisations'

    def __repr__(self):
        return self.name

    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String(120), nullable = False)
    city = db.Column(db.String(120), nullable = False)
    post_code = db.Column(db.String(120), nullable = False)
    adress = db.Column(db.Integer)
    user = db.Column(db.ForeignKey(User.id))
    verified = db.Column(db.Boolean, default=False)
    actions = db.relationship('ActionModel', backref='organisation', lazy=True)

    def save_to_db(self):
        db.session.add(self)
        db.session.commit()

# tabela przechowująca tokeny których ważność została cofnięta
class RevokedToken(db.Model):
    __tablename__ = 'revoked_tokens'
    id = db.Column(db.Integer, primary_key = True)
    jti = db.Column(db.String(120))

    def add(self):
        db.session.add(self)
        db.session.commit()

    @classmethod
    def is_jti_blacklisted(self, jti):
        query = self.query.filter_by(jti = jti).first()
        return bool(query)
