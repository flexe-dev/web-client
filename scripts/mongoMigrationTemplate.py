from pymongo import MongoClient

# Connect to the MongoDB server
client = MongoClient('MongoURI')
db = client['databaseName']
collection = db['collectionName']

# Query the collection
cursor = collection.update_many({}, {"$set": {"newField": "newValue"}})
for document in cursor:
    print(document)
