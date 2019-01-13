from flask_restful import reqparse

from samaritan.utils import date_parser


def geo_loc_parser(marker):
    try:
        parsed_dict = {
            'name': str(marker['name']),
            'address': str(marker['address']),
            'lat': float(marker['lat']),
            'lng': float(marker['lng']),
            'type': str(marker['type'])
        }
    except KeyError:
        raise ValueError('Not all fields required for geoloaction supplied')

    return parsed_dict


action_parser = reqparse.RequestParser(bundle_errors=True)
action_parser.add_argument('name', type=str, required=True)
action_parser.add_argument('points', type=int, required=True)
action_parser.add_argument('start_date', type=date_parser, required=False)
action_parser.add_argument('end_date', type=date_parser, required=True)
action_parser.add_argument('geo', type=geo_loc_parser, required=True)
