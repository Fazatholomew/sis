from functools import wraps
from flask import request, g, jsonify
from itsdangerous import TimedJSONWebSignatureSerializer as Serializer
from itsdangerous import SignatureExpired, BadSignature
from index import app
import os

ONE_WEEK = 604800 


students_file = open(os.path.join(os.getcwd(), "application/utils/students.txt"), "r")
faculties_file = open(os.path.join(os.getcwd(), "application/utils/faculties.txt"), "r")
staff_file = open(os.path.join(os.getcwd(), "application/utils/staffs.txt"), "r")

combined = [students_file, faculties_file, staff_file]
emails_dict = {}


for emails in combined:
    for email in emails:
	email = email[:-1]
	emails_dict[email] = True


def generate_token(user, expiration=ONE_WEEK):
    s = Serializer(app.config['SECRET_KEY'], expires_in=expiration)
    token = s.dumps({
        'id': user.id,
        'email': user.email,
    }).decode('utf-8')
    return token


def verify_token(token):
    s = Serializer(app.config['SECRET_KEY'])
    try:
        data = s.loads(token)
    except (BadSignature, SignatureExpired):
        return None
    return data


def requires_auth(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get('Authorization', None)
        if token:
            string_token = token.encode('ascii', 'ignore')
            user = verify_token(token)
            if user:
                g.current_user = user
                return f(*args, **kwargs)

        return jsonify(message="Authentication is required to access this resource"), 401

    return decorated

def email_check(uname):
    emails = [uname + "@marlboro.edu", uname + "@gradschool.marlboro.edu"]
    try:	
    	return emails_dict[emails[0]] or emails_dict[emails[1]]
    except KeyError:
	return False
