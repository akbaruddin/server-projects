from flask import Blueprint, jsonify

api_route = Blueprint('api_route', __name__)

@api_route.route('/users')
def home():
    return jsonify({ 'user': [] })