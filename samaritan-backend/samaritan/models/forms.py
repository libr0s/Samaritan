from wtforms import Form, fields, validators
from .constants import MAIN_LOCATIONS
from .users import User

# WTForms
def is_email_valid(address):
    user = User.query.filter_by(email = address).first()
    if user:
        return False
    return True


def user_email(form, field):
    if not is_email_valid(field.data):
        raise validators.ValidationError("The e-mail address {} is already taken.".format(field.data))


class UserForm(Form):
    email = fields.StringField('Email', [validators.Email(), user_email])
    password = fields.StringField('Password', [validators.DataRequired()])


class VolunteerForm(UserForm):
    name = fields.StringField('Name', [validators.DataRequired(),
                                    validators.Regexp(r"^\D+$",
                                    message="Not a valid name!")
    ])
    surname = fields.StringField('Surname', [validators.DataRequired(),
                                    validators.Regexp(r"^\D+$",
                                    message="Not a valid surname!")
    ])
    location = fields.SelectField('Location', [validators.DataRequired(),], choices=[
        (v, v) for v in MAIN_LOCATIONS.keys()
    ])


class OrganisationForm(UserForm):
    name = fields.StringField('Name', [validators.DataRequired(),
                                    validators.Regexp(r"^\D+$",
                                    message="Not a valid name!")
    ])
    city = fields.StringField('City', [validators.DataRequired(),
                                    validators.Regexp(r"^\D+$",
                                    message="Not a valid city name!")
    ])
    post_code = fields.StringField('Post-code', [validators.DataRequired(),
                                    validators.Regexp(r"\d{2}-\d{3}",
                                    message="Not a valid post code!")
    ])
