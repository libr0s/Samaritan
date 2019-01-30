from flask_restful import reqparse
from flask_restplus import inputs

grade_parser = reqparse.RequestParser(bundle_errors=True)
grade_parser.add_argument('volunteer_id', type=int, required=True)
grade_parser.add_argument('action_id', type=int, required=True)
grade_parser.add_argument('points', type=int, required=True)

user_search_parser = reqparse.RequestParser(bundle_errors=True)
user_search_parser.add_argument('action_id', type=int, required=True)
user_search_parser.add_argument('grade', type=inputs.boolean, required=True)
