from flask_restful import marshal, fields

from samaritan.models.action import ActionModel

class ActionSerializer(object):

    def __init__(self, action):
        self.action = action
        self.resource_fields = {
            'id': fields.Integer,
            'name': fields.String,
            'organization': fields.String,
            'points': fields.Integer,
            'end_date': fields.DateTime
        }

    def serialize(self):
        return marshal(self.action, self.resource_fields)

    def deserialize(self):
        action_model = ActionModel(
            name=self.action['name'],
            organization=self.action['organization'],
            points=self.action['points'],
            start_date=self.action['start'],
            end_date=self.action['end']
        )

        return action_model
