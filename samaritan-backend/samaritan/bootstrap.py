import datetime

from samaritan.models.db import db
from samaritan.models.users import Organisation, Volunteer, User
from samaritan.models.action import ActionModel, ParticipationModel
from samaritan.models.geo_marker import GeoMarkerModel

def bootstrap_db():
    print('Drop DB')
    db.reflect()
    db.drop_all()
    db.create_all()

    print('Creating new models')
    u1 = User(
        email='u1@wp.pl',
        type='volunteer'
    )
    u1.hash_password('test1234')
    u2 = User(
        email='u2@wp.pl',
        type='organisation'
    )
    u2.hash_password('test1234')
    u3 = User(
        email='u3@wp.pl',
        type='organisation'
    )
    u3.hash_password('test1234')
    u4 = User(
        email='u4@wp.pl',
        type='organisation'
    )
    u4.hash_password('test1234')

    u1.save_to_db()
    u2.save_to_db()
    u3.save_to_db()
    u4.save_to_db()

    v1 = Volunteer(
        name='Janek',
        surname='Testowy',
        user=u1.id,
        points=0,
        rank='Jamnik'
    )

    o1 = Organisation(
        name='Testowa Organizacja',
        city='Zdunska Wola',
        post_code='69-220',
        adress=5,
        verified=True,
        user=u2.id
    )
    o2 = Organisation(
        name='Jamniki Niczyje',
        city='Legnica',
        post_code='59-221',
        adress=5,
        verified=True,
        user=u3.id
    )

    o3 = Organisation(
        name='Organizacja Weryfikacja',
        city='Legnica',
        post_code='59-221',
        adress=5,
        verified=False,
        user=u4.id
    )
    print('Models created')

    v1.save_to_db()
    o1.save_to_db()
    o2.save_to_db()
    o3.save_to_db()

    g = GeoMarkerModel(
        name = 'Testowa lokacja',
        address = 'Jamnikowa 15',
        lat = 1.69,
        lng = -1.69,
        type = 'Lokalizacja',
    )

    print('Creating actions')
    a1 = ActionModel(
        name='Akcja 1',
        points=12,
        end_date=datetime.date(2019, 12, 24),
        geo_loc = g,
    )
    a2 = ActionModel(
        name='Akcja 2',
        points=24,
        end_date=datetime.date(2019, 12, 31),
        geo_loc = g,
    )
    a3 = ActionModel(
        name='Sylwester',
        points=2018,
        start_date=datetime.date(2018, 12, 31),
        end_date=datetime.date(2019, 1, 1),
        geo_loc = g,
    )

    o1.actions.extend([a1, a2])
    o1.save_to_db()
    o2.actions.append(a3)
    o2.save_to_db()

    print('DB Bootstraped')
