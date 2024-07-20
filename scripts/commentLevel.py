from certifi import where
from pymongo import MongoClient

# Connect to the MongoDB server
client = MongoClient("mongodb+srv://dawad:JT%40cker123@designs-dev.uahzh3v.mongodb.net/DD-Test?retryWrites=true&w=majority&appName=designs-dev", tlsCAFile=where())
db = client['DD-Test']
collection = db['PostComment']

# Query the collection
try:
    collection.update_many({}, {"$unset": {"level": 1}})
    print("Updated all documents")
except Exception as e:
    print("An error occurred: ", e)
