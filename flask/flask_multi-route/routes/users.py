from flask import Blueprint, render_template

users_route = Blueprint('users_route', __name__)

@users_route.route('/user')
def user():
    return render_template('users/index.html')