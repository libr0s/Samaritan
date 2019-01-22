from functools import wraps
from flask import request,jsonify
from flask_restful import Resource, reqparse
from flask_jwt_extended import (
    create_access_token,
    jwt_required,
    get_jwt_identity,
    get_raw_jwt,
    verify_jwt_in_request,
    get_jwt_claims
)
from .users import User, Volunteer, Organisation, RevokedToken
from .forms import UserForm, VolunteerForm, OrganisationForm
from .db import jwt

parser = reqparse.RequestParser()
parser.add_argument('type', required=True, help='Blank Type!')

login_parser = reqparse.RequestParser()
login_parser.add_argument('email', required=True, help='Blank Type!')
login_parser.add_argument('password', required=True, help='Blank Type!')


@jwt.token_in_blacklist_loader
def check_if_token_in_blacklist(decrypted_token):
    jti = decrypted_token['jti']
    return RevokedToken.is_jti_blacklisted(jti)

# decorator dający dostęp tylko użytkownikom z kontami organizacji i ważnymi tokenami
def organisation_required(fn):
    @wraps(fn)
    def wrapper(*args, **kwargs):
        verify_jwt_in_request()
        claims = get_jwt_claims()
        if claims['type'] != 'organisation':
            return {'msg':'Access from organisation account !'},403
        else:
            return fn(*args, **kwargs)
    return wrapper

# decorator dający dostęp tylko użytkownikom z kontami wolontariuszy i ważnymi tokenami
def volunteer_required(fn):
    @wraps(fn)
    def wrapper(*args, **kwargs):
        verify_jwt_in_request()
        claims = get_jwt_claims()
        if claims['type'] != 'volunteer':
            return {'msg':'Access from volunteer account !'},403
        else:
            return fn(*args, **kwargs)
    return wrapper

# funkcja dodająca do tokena typ konta użytkownika
@jwt.user_claims_loader
def add_claims_to_access_token(identity):
    user = User.find_by_email(identity)
    return {
        'type': str(user.type),
        'user_id': str(user.id),
    }

class UserRegistration(Resource):
   def post(self):
        data = parser.parse_args()
        form = None

        if data['type'] == 'volunteer':
            form = VolunteerForm(data=request.get_json())
            new_user = User(email = form.email.data, type = data['type'])
            type_user = Volunteer(name = form.name.data, surname = form.surname.data, user = new_user.id)

        elif data['type'] == 'organisation':
            form = OrganisationForm(data=request.get_json())
            new_user = User(email = form.email.data, type = data['type'])
            type_user = Organisation(name = form.name.data, city = form.city.data,post_code=form.post_code.data, user = new_user.id)

        if form.validate():
            new_user.hash_password(form.password.data)
            new_user.save_to_db()
            type_user.user = new_user.id
            type_user.save_to_db()


        else:
            return {'message': form.errors},400

        return {'message': 'Account created successfully'}

   def get(self):
        return User.get_users()

class UserLogin(Resource):
    def post(self):
        data = login_parser.parse_args()
        user = User.find_by_email(data['email'])

        if not user:
            return {'message': 'Wrong email or password !'},400

        if user.verify_password(data['password']):
            access_token = create_access_token(identity = data['email'])
            return {
            'message': 'Successfully logged in',
            'access_token': access_token
            }
        else:
            return {'message': 'Wrong email or password !'},400

class UserLogout(Resource):
    @jwt_required
    def post(self):
        jti = get_raw_jwt()['jti']
        try:
            revoked_token = RevokedToken(jti = jti)
            revoked_token.add()
            return {'message': 'You have been logged out !'}
        except:
            return {'message': 'Something went wrong'}, 500

# endpoint dostępny tylko dla organizacji z ważnym tokenem
class OrganisationResource(Resource):
    @organisation_required
    def get(self):
        return {'message': 'organisation endpoint'}

# endpoint dostępny tylko dla wolontariuszy z ważnym tokenem
class VolunteerResource(Resource):
    @volunteer_required
    def get(self):
        return {'message': 'volunteer endpoint'}

# endpoint dostępny zarówno dla wolontariuszy i organizacji z ważnym tokenem
class CommonResource(Resource):
    @jwt_required
    def get(self):
        return {'message': 'organisation and volunteer endpoint'}
