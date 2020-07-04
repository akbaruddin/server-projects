from flask import Blueprint, render_template

homes_route = Blueprint('homes_route', __name__)

@homes_route.route('/home')
def home():
    return render_template('homes/index.html')
