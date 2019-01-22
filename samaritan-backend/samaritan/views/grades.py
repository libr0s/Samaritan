from flask_restful import (
    reqparse,
    abort,
    Api,
    Resource,
)
from samaritan.models.auth import organisation_required
from samaritan.models.users import Volunteer
from samaritan.models.action import ParticipationModel, ActionModel
from samaritan.serializers import VolunteersSerializer
from samaritan.parsers.grades import grade_parser, user_search_parser

from samaritan.utils import get_user_from_claim
from flask_jwt_extended import jwt_required, get_jwt_claims
from datetime import datetime

class GradingView(Resource):

    @organisation_required
    def post(self):
        data = grade_parser.parse_args()
        p = ParticipationModel.query.filter_by(action_id = data['action_id'], volunteer_id = data['volunteer_id']).first()
        v = Volunteer.query.filter_by(id = data['volunteer_id']).first()
        a = ActionModel.query.filter_by(id = data['action_id']).first()

        claims = get_jwt_claims()
        user = get_user_from_claim(claims)

        if not a or a.organisation_id != user.id:
            return {'message':'To nie jest akcja Twojej organizacji'}, 403

        if a.end_date > datetime.now():
            return {'message':'Akcja sie nie zakonczyla'}, 400

        if p and (not p.grade):
            p.grade = True
            v.points += data['points']
            v.save_to_db()
            p.save_to_db()

            return {'message':'Wolontariusz oceniony'}, 200

        else:
            return {'message':'Dany wolontariusz nie może zostać oceniony w tej akcji'}, 404

    @organisation_required
    def get(self):
        data = user_search_parser.parse_args()
        volunteers = []
        v = None

        for p in ParticipationModel.query.filter_by(action_id = data['action_id'], grade = data['grade']):
            v = Volunteer.query.filter_by(id = p.volunteer_id).first()
            volunteers.append(VolunteersSerializer(v).serialize())

        if v:
            return volunteers, 200
        else:
            return {'message': 'Brak użytkowników spełniających dane kryteria'}, 404
