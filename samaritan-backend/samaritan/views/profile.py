from flask_jwt_extended import jwt_required, get_jwt_claims
from flask_restful import Resource

from samaritan.serializers import OrganisationSerializer, VolunteersSerializer
from samaritan.utils import get_user_from_claim

class ProfileView(Resource):

    @jwt_required
    def get(self):
        claims = get_jwt_claims()
        user = get_user_from_claim(claims)

        if claims['type'] == 'volunteer':
            return VolunteersSerializer(user).serialize()
        elif claims['type'] == 'organisation':
            return OrganisationSerializer(user).serialize()
        else:
            return {'message': 'Error, du not nou'}, 500

    # TODO
    @jwt_required
    def put(self):
        pass