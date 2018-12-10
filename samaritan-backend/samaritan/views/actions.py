from flask_restful import (
    reqparse,
    abort,
    Api,
    Resource,
)

from samaritan.models.action import ActionModel
from samaritan.serializers import ActionSerializer
from samaritan.parsers.actions import action_parser


# for testing
from samaritan.models.users import Organisation


class ActionView(Resource):

    @classmethod
    def non_exists(cls):
        return {'message': 'Akcja o zadanym id nie istnieje :c'}, 404

    def get(self, action_id):
        a = ActionModel.query.filter_by(id=action_id).first()

        if a:
            return ActionSerializer(a).serialize()
        else:
            return self.non_exists()

    def delete(self, action_id):
        a = ActionModel.query.filter_by(id=action_id).first()
        if a:
            a.delete()
        else:
            return self.non_exists()

    def put(self, action_id):
        args = action_parser.aprse_args()

        return {}


class ActionListView(Resource):
    
    def get(self):
        actions = []
        for action in ActionModel.query.all():
            actions.append(
                ActionSerializer(action).serialize()
            )

        return actions

    def post(self):
        args = action_parser.parse_args()
        o = Organisation.query.all()[0]
        a = ActionModel(
            name=args['name'],
            points=args['points'],
            end_date=args['end_date'],
        )

        if args.get('start_date'):
            a.start_date = args['start_date']

        try:
            o.actions.append(a)
            o.save_to_db()
        except Exception:
            return {'message': 'Blad serwera'}, 500

        return {'message': 'Stowrzono akcje id: {}'.format(a.id)}, 201