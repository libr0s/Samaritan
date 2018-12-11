from flask_restful import marshal, fields

from samaritan.models.action import ActionModel


class OrganisationField(fields.Raw):

    def format(self, value):
        return {
            'name': value.name,
            'id': value.id
        }


class ActionSerializer(object):

    def __init__(self, action):
        self.action = action
        self.resource_fields = {
            'id': fields.Integer,
            'name': fields.String,
            'organisation': OrganisationField,
            'points': fields.Integer,
            'end_date': fields.DateTime
        }

    def serialize(self):
        return marshal(self.action, self.resource_fields)


class OrganisationSerializer(object):

    def __init__(self, organisation):
        self.organisation = organisation
        self.resource_fields = {
            'id': fields.Integer,
            'name': fields.String,
            'city': fields.String,
            'address': fields.Integer,
            'post_code': fields.String
        }

    def serialize(self):
        return marshal(self.organisation, self.resource_fields)


class VolunteersSerializer(object):

    def __init__(self, volunteer):
        self.volunteer = volunteer
        self.resource_fields = {
            'id': fields.Integer,
            'name': fields.String,
            'surname': fields.String,
            'points': fields.Integer,
            'rank': fields.String
        }

    def serialize(self):
        return marshal(self.volunteer, self.resource_fields)
