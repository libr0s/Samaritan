from datetime import datetime

from flask_restful import (
    reqparse,
    abort,
    Api,
    Resource,
)
from flask_jwt_extended import jwt_required, get_jwt_claims

from samaritan.models.action import ActionModel
from samaritan.models.auth import (
    volunteer_required,
    organisation_required,
)
from samaritan.models.geo_marker import GeoMarkerModel
from samaritan.models.users import Organisation
from samaritan.serializers import ActionSerializer
from samaritan.parsers.actions import action_parser, action_update_parser
from samaritan.utils import get_user_from_claim


class ActionView(Resource):

    @classmethod
    def non_exists(cls):
        return {'message': 'Akcja o zadanym id nie istnieje :c'}, 404

    @jwt_required
    def get(self, action_id):
        a = ActionModel.query.filter_by(id=action_id).first()

        if a:
            return ActionSerializer(a).serialize()
        else:
            return self.non_exists()

    @organisation_required
    def delete(self, action_id):
        a = ActionModel.query.filter_by(id=action_id).first()
        claims = get_jwt_claims()
        user = get_user_from_claim(claims)
        if a:
            if a in user.actions:
                a.delete()
                return {'message': 'Akcje o id: {} usunieta.'.format(action_id)}, 200
            else:
                return {'message': 'To nie jest akcja twojej organizacji'}, 403
        else:
            return self.non_exists()

    @organisation_required
    def put(self, action_id):
        args = action_update_parser.parse_args()

        a = ActionModel.query.filter_by(id=action_id).first()
        claims = get_jwt_claims()
        user = get_user_from_claim(claims)
        if a:
            if a in user.actions:
                for atr, val in args.items():
                    setattr(a, atr, val)
                a.save_to_db()
                return {'message': 'Akcje o id: {} zmodyfikowana.'.format(action_id)}, 200
            else:
                return {'message': 'To nie jest akcja twojej organizacji'}, 403
        else:
            return self.non_exists()


class ActionListView(Resource):

    @jwt_required
    def get(self):
        actions = []

        claims = get_jwt_claims()
        user = get_user_from_claim(claims)

        if isinstance(user, Organisation):
            qs = ActionModel.query.filter(ActionModel.organisation_id==user.id)
        else:
            qs = ActionModel.query\
            .filter(ActionModel.start_date <= datetime.now())\
            .filter(ActionModel.end_date >= datetime.now())

        for action in qs:
            actions.append(
                ActionSerializer(action).serialize()
            )

        return actions

    @organisation_required
    def post(self):
        args = action_parser.parse_args()
        claims = get_jwt_claims()
        o = get_user_from_claim(claims)
        g = GeoMarkerModel(**args['geo'])
        a = ActionModel(
            name=args['name'],
            points=args['points'],
            end_date=args['end_date'],
            geo_loc=g,
        )

        if args.get('start_date'):
            a.start_date = args['start_date']

        try:
            o.actions.append(a)
            o.save_to_db()
        except Exception:
            return {'message': 'Blad serwera'}, 500

        return {'message': 'Stowrzono akcje id: {}'.format(a.id)}, 201
