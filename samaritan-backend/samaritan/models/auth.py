from flask_restful import Resource, reqparse

from .users import User

parser = reqparse.RequestParser()
parser.add_argument('username', help = 'blank_user',required = True)
parser.add_argument('password', help = 'blank_password',required = True)

class UserRegistration(Resource):
   def post(self):
        data = parser.parse_args()
        new_user = User(username = data['username'],password = data['password'])

        if User.find_by_username(data['username']):
            return {'message': 'user_exists'},400

        else:
            new_user.save_to_db()
            return {'message': 'user_created'}

   def get(self):
        return User.get_users()
