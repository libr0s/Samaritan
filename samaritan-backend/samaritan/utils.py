from datetime import datetime
import sys

from samaritan.models.users import Volunteer, Organisation

date_parser = lambda x: datetime.strptime(x,'%Y-%m-%d')

def get_user_from_claim(claim):
    over_user = None
    if claim['type'] == 'volunteer':
        over_user = Volunteer.query.filter_by(user=claim['user_id']).first()
    elif claim['type'] == 'organisation':
        over_user = Organisation.query.filter_by(user=claim['user_id']).first()

    return over_user
