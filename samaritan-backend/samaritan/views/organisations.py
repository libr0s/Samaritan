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
        o = Organisation.query.filter_by(id=organisation_id).first()

        if o:
            return OrganisationSerializer(o).serialize()
        else:
            return {'message': 'Organizacja o zadanym id nie istnieje :c'}, 404


class OrganisationListView(Resource):

    def get(self):
        organisations = []

        for o in Organisation.query.filter_by(verified=True):
            organisations.append(
                OrganisationSerializer(o).serialize()
            )

        return organisations