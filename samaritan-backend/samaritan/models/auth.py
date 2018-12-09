from flask import request
from flask_restful import Resource, reqparse
from .users import User, Volunteer, Organisation
from .forms import UserForm, VolunteerForm, OrganisationForm
import sys

parser = reqparse.RequestParser()
parser.add_argument('type', required=True, help='Blank Type!')

class UserRegistration(Resource):
   def post(self):
        data = parser.parse_args()

        if data['type'] == 'volunteer':
            form = VolunteerForm(data=request.get_json())
            new_user = User(email = form.email.data,password = form.password.data, type = data['type'])
            type_user = Volunteer(name = form.name.data, surname = form.surname.data, user = new_user.id)

        elif data['type'] == 'organisation':
            form = OrganisationForm(data=request.get_json())
            new_user = User(email = form.email.data,password = form.password.data, type = data['type'])
            type_user = Organisation(name = form.name.data, city = form.city.data,post_code=form.post_code.data, user = new_user.id)

        if form.validate():
            type_user.save_to_db()
            new_user.save_to_db()

        else:
            return {'message': form.errors},400

        return {'message': 'user_created'}

   def get(self):
        return User.get_users()
