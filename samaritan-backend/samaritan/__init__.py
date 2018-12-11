from flask import Flask
from flask_restful import Api
from flask_jwt_extended import JWTManager

app = Flask(__name__)
jwt = JWTManager(app)

app.config['SECRET_KEY'] = "klucz do wygenerowania"
app.config['JWT_SECRET_KEY'] = 'jwt-secret-string'
app.config['JWT_BLACKLIST_ENABLED'] = True
app.config['JWT_BLACKLIST_TOKEN_CHECKS'] = ['access', 'refresh']

from samaritan.models import auth
from samaritan.models import users
from samaritan.views import base
from samaritan.bootstrap import bootstrap_db
from samaritan.models import auth, action
from samaritan.views import (
    base,
    actions,
    volunteers,
    organisations,
)

api = Api(app)

@jwt.token_in_blacklist_loader
def check_if_token_in_blacklist(decrypted_token):
    jti = decrypted_token['jti']
    return users.RevokedToken.is_jti_blacklisted(jti)

api.add_resource(auth.UserRegistration, '/registration')
api.add_resource(auth.UserLogin, '/login')
api.add_resource(auth.UserLogout, '/logout')
api.add_resource(actions.ActionListView, '/actions')
api.add_resource(actions.ActionView, '/action/<int:action_id>')
api.add_resource(volunteers.VolunteerListView, '/volunteers')
api.add_resource(volunteers.VolunteerView, '/volunteer/<int:volunteer_id>')
api.add_resource(organisations.OrganisationListView, '/organisations')
api.add_resource(organisations.OrganisationView, '/organisation/<int:organisation_id>')

@app.shell_context_processor
def make_shell_context():
    return {'bootstrap': bootstrap_db}
