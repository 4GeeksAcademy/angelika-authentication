"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint, render_template
from flask_jwt_extended import get_jwt_identity
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import jwt_required
from flask_jwt_extended import create_access_token

api = Blueprint('api', __name__)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! Check the login and sign up options"
    }

    return jsonify(response_body), 200

@api.route('/signup', methods=['POST'])
def handle_signup():
    from app import bcrypt
    body = request.get_json()
    password_hash = bcrypt.generate_password_hash(
        body["password"]).decode("utf-8")
    new_user = User(name=body["name"], email=body["email"],
                            password=password_hash)
    db.session.add(new_user)
    db.session.commit()
    print(body)
    return jsonify("The new user was added"), 200

@api.route('/login', methods=['POST'])
def handle_login():
    from app import bcrypt
    body = request.get_json()
    user = User.query.filter_by(email=body["email"]).first()
    if user is None:
        return jsonify("The email doesn't exist"), 400
    if bcrypt.check_password_hash(user.password, body["password"]):
        access_token = create_access_token(identity=user.email)
        response_body = {
            "access_token": access_token,
            "user": user.serialize()
        }
        return jsonify(response_body), 200
    else:
        return jsonify("The password is incorrect"), 400


@api.route('/private', methods=['GET'])
@jwt_required()
def handle_private():
    # Access the identity of the current user with get_jwt_identity
    current_user = get_jwt_identity() 
    return jsonify(logged_in_as=current_user), 200