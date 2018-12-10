from flask_restful import (
    reqparse,
    abort,
    Api,
    Resource,
)

from samaritan.models.action import ActionModel
from samaritan.serializers import ActionSerializer


class ActionView(Resource):

    def get(self, action_id):
        a = ActionModel.query.filter_by(id=action_id).first()

        return ActionSerializer(a).serialize()

    def delete(self, action_id):
        a = ActionModel.query.filter_by(id=action_id).first()
        a.delete()

    def put(self, action_id):
        pass


class ActionListView(Resource):
    
    def get(self):
        actions = []
        for action in ActionModel.quer.all():
            actions.append(
                ActionSerializer(action).serialize()
            )

        return actions

    def post(self):
        pass