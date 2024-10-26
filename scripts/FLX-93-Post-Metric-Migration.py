from core.mongoDBClientInit import initMongoClient

if __name__ == "__main__":
    db = initMongoClient()
    collection = db["Posts"]
    result = collection.update_many({}, {"$set": {"metrics.repostCount": 0}})
    print(result.modified_count, "documents updated.")
