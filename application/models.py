#from index import db, bcrypt
from index import db
from werkzeug.security import generate_password_hash, check_password_hash

offers_history_table = db.Table('offers_history_table',
		db.Column('user_id', db.Integer, db.ForeignKey('user.id')),
		db.Column('offer_id', db.Integer, db.ForeignKey('offer.id'))
 )

class User(db.Model):
    id = db.Column(db.Integer(), primary_key=True)
    name = db.Column(db.String(255))
    email = db.Column(db.String(255), unique=True)
    password = db.Column(db.String(255))
    offers = db.relationship('Offer', backref='user.creator')
    requests = db.relationship('Request', backref='user.creator')
    offers_history = db.relationship('Offer', secondary=offers_history_table, backref=db.backref('passenger_list', lazy='dynamic'))

    def __init__(self, name, email, password):
        self.email = email
	self.name = name
        self.active = True
        self.password = User.hashed_password(password)

    @staticmethod
    def hashed_password(password):
        #return bcrypt.generate_password_hash(password).decode("utf-8")
	return generate_password_hash(password)

    @staticmethod
    def get_user_with_email_and_password(email, password):
        user = User.query.filter_by(email=email).first()
        #if user and bcrypt.check_password_hash(user.password, password):
        if user and check_password_hash(user.password, password):    
	    return user
        else:
            return None

    @staticmethod
    def get_users():
	users = User.query.all()
	#users = users.append([User.query.filter([User.requests] > None).all()])
	print(users)
	return {x.id: {'name': x.name, 'email': x.email + '@marlboro.edu'} for x in users }


class Offer(db.Model):
	id = db.Column(db.Integer(), primary_key=True)
	user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
	asal = db.Column(db.String(255))
	tujuan = db.Column(db.String(255))
	fee = db.Column(db.Integer())
	time = db.Column(db.DateTime())
	passenger = db.Column(db.Integer)
	color = db.Column(db.Integer)

	@staticmethod
	def get_all_offers():
	  offers = Offer.query.all()
	  offers = {x.id: {'user_id': x.user_id, 'asal': x.asal, 'tujuan': x.tujuan, 'fee': x.fee, 'time': x.time, 'passenger': x.passenger, 'passengers': [y.id for y in x.passenger_list], 'color': x.color} for x in offers}
	  return offers


class Request(db.Model):
	id = db.Column(db.Integer(), primary_key=True)
	user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
	asal = db.Column(db.String(255))
	tujuan = db.Column(db.String(255))
	time = db.Column(db.DateTime())
	color = db.Column(db.Integer)

	@staticmethod
	def get_all_requests():
	  requests = Request.query.all()
	  requests = {x.id: {'user_id': x.user_id, 'asal': x.asal, 'tujuan': x.tujuan, 'time': x.time, 'color': x.color} for x in requests}
	  return requests
	

	#active feature, delete when passed
