from flask_restful import reqparse

from samaritan.utils import date_parser


action_parser = reqparse.RequestParser(bundle_errors=True)
action_parser.add_argument('name', type=str, required=True)
action_parser.add_argument('points', type=int, required=True)
action_parser.add_argument('start_date', type=date_parser, required=False)
action_parser.add_argument('end_date', type=date_parser, required=True)