from flask import Blueprint, send_from_directory
import os
from settings import STATIC_FOLDER

base_route = Blueprint('base_route', __name__)

@base_route.route('/favicon.ico')
def favicon():
    return send_from_directory(
        os.path.join(base_route.root_path, '../', STATIC_FOLDER, 'favicon'),
        'favicon.ico',
        mimetype='image/vnd.microsoft.icon'
    )