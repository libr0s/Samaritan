from flask import Flask
from flask_restful import Api

app = Flask(__name__)

app.config['SECRET_KEY'] = "klucz do wygenerowania"

from samaritan.bootstrap import bootstrap_db
from samaritan.models import auth, action
from samaritan.views import (
    actions,
    volunteers,
    organisations,
    profile,
)

api = Api(app)

api.add_resource(auth.UserRegistration, '/registration')
api.add_resource(auth.UserLogin, '/login')
api.add_resource(auth.UserLogout, '/logout')
api.add_resource(profile.ProfileView, '/profile')
api.add_resource(actions.ActionListView, '/actions')
api.add_resource(actions.ActionView, '/action/<int:action_id>')
api.add_resource(volunteers.VolunteerListView, '/volunteers')
api.add_resource(volunteers.VolunteerView, '/volunteer/<int:volunteer_id>')
api.add_resource(organisations.OrganisationListView, '/organisations')
api.add_resource(organisations.OrganisationView, '/organisation/<int:organisation_id>')

@app.shell_context_processor
def make_shell_context():
    return {'bootstrap': bootstrap_db}
