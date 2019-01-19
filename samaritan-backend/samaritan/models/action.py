from .db import db

from datetime import datetime


class ParticipationModel(db.Model):
    __tablename__ = 'participations'

    id = db.Column(db.Integer, primary_key=True)
    action_id = db.Column(
        db.Integer, db.ForeignKey('actions.id'),
        nullable=False
    )
    volunteer_id = db.Column(
        db.Integer, db.ForeignKey('volunteers.id'),
        nullable=False
    )
    grade = db.Column(db.Boolean, default=False)

    def save_to_db(self):
        db.session.add(self)
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()


class ActionModel(db.Model):
    __tablename__ = 'actions'

    id = db.Column(db.Integer, primary_key=True)
    particitpations = db.relationship(
        'ParticipationModel', backref='action', lazy=True
    )
    name = db.Column(db.String(255), nullable=False)
    organisation_id = db.Column(
        db.Integer, db.ForeignKey('organisations.id')
    )
    points = db.Column(db.Integer, nullable=False)
    start_date = db.Column(db.DateTime, default= datetime.now())
    end_date = db.Column(db.DateTime, nullable=False)

    geo_loc_id = db.Column(db.Integer, db.ForeignKey('geomarkers.id'))
    geo_loc = db.relationship(
        'GeoMarkerModel', backref=db.backref('action', uselist=False), lazy=True
    )

    def save_to_db(self):
        db.session.add(self)
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()
