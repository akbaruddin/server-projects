import os
from dotenv import load_dotenv
load_dotenv()

TEMPLATE = os.getenv('TEMPLATE')
STATIC_FOLDER = os.getenv('STATIC_FOLDER')
STATIC_URL_PATH = os.getenv('STATIC_URL_PATH')