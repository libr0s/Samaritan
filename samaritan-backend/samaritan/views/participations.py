from flask_restful import (
    reqparse,
    abort,
    Api,
    Resource,
)
from flask_jwt_extended import jwt_required, get_jwt_claims
from samaritan.models.auth import (
    volunteer_required,
    organisation_required,
)

from samaritan.models.users import Volunteer
from samaritan.models.action import ParticipationModel, ActionModel
from samaritan.serializers import VolunteersSerializer, ActionSerializer
from samaritan.utils import get_user_from_claim

# todo: zablokowanie możliwości dołączenia do zakończonej akcji

class VolunteerParticipationView(Resource):

    @volunteer_required
    def post(self, action_id):
        claims = get_jwt_claims()
        user = get_user_from_claim(claims)
        a = ActionModel.query.filter_by(id = action_id).first()
        ex = ParticipationModel.query.filter_by(action_id = action_id, volunteer_id = user.id).first()

        if ex:
            return {'message': "Jestes juz zapisany do tej akcji"}, 500

        p = ParticipationModel(action_id= action_id, volunteer_id = user.id,)

        if a:
            try:
                p.save_to_db()

            except Exception:
                return {'message': 'Blad serwera'}, 500

            return {'message': 'Dolaczono do akcji o id: {}'.format(action_id)}, 201
        else:
            return {'message': 'Dana akcja nie istnieje'}, 404

    @volunteer_required
    def delete(self, action_id):
        c = get_jwt_claims()
        u = get_user_from_claim(c)
        p = ParticipationModel.query.filter_by(action_id = action_id, volunteer_id = u.id).first()

        if p:
            p.delete()
            return {'message': 'Anulowano udział w akcji o id: {}'.format(action_id)},201
        else:
            return self.non_exists()

    @volunteer_required
    def get(self, action_id = None):
        a = None
        actions = []
        claims = get_jwt_claims()
        user = get_user_from_claim(claims)

        for p in ParticipationModel.query.filter_by(volunteer_id = user.id):
            a = ActionModel.query.filter_by(id = p.action_id).first()
            actions.append(ActionSerializer(a).serialize())

        if a:
            return actions, 201
        else:
            return {'message': 'Użytkownik nie jest zapisany do żadnej akcji'}, 404


class ParticipationListView(Resource):

    @jwt_required
    def get(self, action_id):
        v = None
        volunteers = []

        for p in ParticipationModel.query.filter_by(action_id = action_id):
            v = Volunteer.query.filter_by(id = p.volunteer_id).first()
            volunteers.append(VolunteersSerializer(v).serialize())

        if v:
            return volunteers, 201
        else:
            return {'message': 'Brak użytkowników zapisanych do tej akcji'}, 404
