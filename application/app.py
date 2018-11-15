from flask import request, render_template, jsonify, url_for, redirect, g
from .models import User, Offer, Request
from index import app, db
from sqlalchemy.exc import IntegrityError
from .utils.auth import generate_token, requires_auth, verify_token
from datetime import datetime
from random import randint

@app.route('/', methods=['GET'])
def index():
    return render_template('index.html')


@app.route('/<path:path>', methods=['GET'])
def any_root_path(path):
    return render_template('index.html')


@app.route("/api/user", methods=["GET"])
@requires_auth
def get_user():
    return jsonify(result=g.current_user)

@app.route("/api/users/<int:id>", methods=["GET"])
@requires_auth
def get_user_name(id):
    current_user = User.query.get(id)
    name = current_user.name
    email = current_user.email
    return jsonify({'id': id, 'name': name, 'email': email})

@app.route("/api/users/active", methods=["GET"])
@requires_auth
def get_activeUsers():
    return jsonify(User.get_users())

@app.route("/api/entries", methods=["GET"])
@requires_auth
def get_entries():
    offers = Offer.get_all_offers()
    requests = Request.get_all_requests()
    return jsonify({'offers': offers, 'requests': requests})

@app.route("/api/entries/offers/<int:entry_id>", methods=["DELETE"])
@requires_auth
def delete_offer(entry_id):
    entry = Offer.query.get(entry_id)
    db.session.delete(entry)
    try:
        db.session.commit()
        return jsonify("Entry deleted!")

    except IntegrityError:
        return jsonify("No Entry exist!"), 409    

@app.route("/api/entries/requests/<int:entry_id>", methods=["DELETE"])
@requires_auth
def delete_request(entry_id):
    entry = Request.query.get(entry_id)
    db.session.delete(entry)
    try:
        db.session.commit()
        return jsonify("Entry deleted!")

    except IntegrityError:
        return jsonify("No Entry exist!"), 409

@app.route("/api/create_offer", methods=["POST"])
@requires_auth
def create_offer():
    json_to_object = request.get_json()
    incoming = json_to_object["data"]
    offer = Offer(
	user_id = incoming["user_id"],
	asal = incoming["from"],
	tujuan = incoming["to"],
	fee = incoming["fee"],
	time = datetime.strptime(incoming["time"], "%a, %d %b %Y %H:%M:%S %Z"),
	color = randint(0,10),
	passenger = incoming["passenger"]
     )
    db.session.add(offer)

    try:	
	db.session.commit()
    except IntegrityError:
	return jsonify(message="Error in creating offer"), 403
    if len(incoming["passengers"]) <= offer.passenger:
        for x in incoming["passengers"]:
	    passenger = User.query.get(x)
	    offer.passenger_list.append(passenger)
    elif len(incoming["passengers"]) >= offer.passenger:
	return jsonify(message="Passengers are more than capacity!"), 403
    else:
	return jsonify(id=offer.id)
    try:
        db.session.commit()
    except IntegrityError:
        return jsonify(message="Error passengers list!"), 403
    return jsonify(id=offer.id)

@app.route("/api/create_request", methods=["POST"])
@requires_auth
def create_request():
    json_to_object = request.get_json()
    incoming = json_to_object["data"]
    entry_request = Request(
        user_id = incoming["user_id"],
        asal = incoming["from"],
        tujuan = incoming["to"],
        time = datetime.strptime(incoming["time"], "%a, %d %b %Y %H:%M:%S %Z"),
        color = randint(0,10),
     )
    db.session.add(entry_request)

    try:
        db.session.commit()
    except IntegrityError:
        return jsonify(message="Error in creating offer"), 403
    return jsonify(id=entry_request.id)

@app.route("/api/patch_join", methods=["PATCH"])
@requires_auth
def join():
    json_to_object = request.get_json()
    incoming = json_to_object["data"]
    entry = Offer.query.get(incoming["entry_id"])
    user = User.query.get(incoming["user_id"])
    print(len(list(entry.passenger_list)))
    if len(list(entry.passenger_list)) >= entry.passenger:
        return jsonify("Ride is full!"), 409
    entry.passenger_list.append(user)
    try:
        db.session.commit()
        return jsonify("You are joined!")

    except IntegrityError:
        return jsonify("No Entry exist!"), 409

@app.route("/api/create_user", methods=["POST"])
def create_user():
    incoming = request.get_json()
    user = User(
	name=incoming["name"],
        email=incoming["email"],
        password=incoming["password"]
    )
    db.session.add(user)

    try:
        db.session.commit()
    except IntegrityError:
        return jsonify(message="User with that email already exists"), 409

    new_user = User.query.filter_by(email=incoming["email"]).first()

    return jsonify(
        id=user.id,
        token=generate_token(new_user)
    )


@app.route("/api/get_token", methods=["POST"])
def get_token():
    incoming = request.get_json()
    user = User.get_user_with_email_and_password(incoming["email"], incoming["password"])
    if user:
        return jsonify(token=generate_token(user))

    return jsonify(error=True), 403


@app.route("/api/is_token_valid", methods=["POST"])
def is_token_valid():
    incoming = request.get_json()
    decoded = verify_token(incoming["token"])
    is_valid = User.query.get(decoded['id'])
    print(is_valid)

    if is_valid:
        return jsonify(token_is_valid=True)
    else:
        return jsonify(token_is_valid=False), 403
