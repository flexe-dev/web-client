import os
import sys

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), os.path.pardir, os.path.pardir)))
from certifi import where
from dotenv import load_dotenv
from pymongo import MongoClient


def initMongoClient():
    load_dotenv()

    MONGODB_URI = os.getenv("MONGODB_URI")
    DB_NAME = os.getenv("MONGODB_DB_NAME")

    return MongoClient(MONGODB_URI, tlsCAFile=where())[DB_NAME]

