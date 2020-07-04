from flask import Flask, render_template
# settings
from settings import *
# routes import
from routes.base import base_route
from routes.homes import homes_route
from routes.users import users_route
from apis.users import api_route

app = Flask(__name__)
# set default for all routes
app.url_map.strict_slashes = False
app.template_folder = TEMPLATE
app.static_folder = STATIC_FOLDER
app.static_url_path = STATIC_URL_PATH
# routes
app.register_blueprint(base_route)
app.register_blueprint(api_route, url_prefix='/api')
app.register_blueprint(homes_route)
app.register_blueprint(users_route)

@app.route('/')
def hello_world():
    return render_template('index.html')
