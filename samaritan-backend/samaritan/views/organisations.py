from flask_restful import (
    reqparse,
    abort,
    Api,
    Resource,
)

from samaritan.models.users import Organisation
from samaritan.serializers import OrganisationSerializer


class OrganisationView(Resource):
    
    def get(self, organisation_id):
        o = Organisation.query.get(id=organisation_id)

        if o:
            return OrganisationSerializer(o).serialize()
        else:
            return {'message': 'Akcja o zadanym id nie istnieje :c'}, 404


class OrganisationListView(Resource):

    def get(self):
        organisations = []

        for o in Organisation.query.filter(verified=True):
            organisations.append(
                OrganisationSerializer(o).serialize()
            )

        return organisations