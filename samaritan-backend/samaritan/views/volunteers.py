from flask_restful import (
    reqparse,
    abort,
    Api,
    Resource,
)
from flask_jwt_extended import jwt_required


from samaritan.models.users import Volunteer
from samaritan.serializers import VolunteersSerializer

class VolunteerView(Resource):
    
    @jwt_required
    def get(self, volunteer_id):
        v = Volunteer.query.filter_by(id=volunteer_id).first()

        if v:
            return VolunteersSerializer(v).serialize()
        else:
            return {'message': 'Wolontariusz o zadanym id nie istnieje :c'}, 404



class VolunteerListView(Resource):
    
    @jwt_required
    def get(self):
        volunteers = []

        for v in Volunteer.query.all():
            volunteers.append(
                VolunteersSerializer(v).serialize()
            )

        return volunteers
