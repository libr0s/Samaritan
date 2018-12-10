from flask_restful import (
    reqparse,
    abort,
    Api,
    Resource,
)

from samaritan.models.users import Volunteer
from samaritan.serializers import VolunteersSerializer

class VolunteerView(Resource):

    @classmethod
    def non_exists(cls):
        return {'message': 'Akcja o zadanym id nie istnieje :c'}, 404
    
    def get(self, user_id):
        v = Volunteer.query.get(id=id)

        if v:
            return VolunteersSerializer(v).serialize()
        else:
            return {'message': 'Akcja o zadanym id nie istnieje :c'}, 404



class VolunteerListView(Resource):
    
    def get(self):
        volunteers = []

        for v in Volunteer.query.all():
            volunteers.append(
                VolunteersSerializer(v).serialize()
            )

        return volunteers
