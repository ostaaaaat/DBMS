from flask import Flask, render_template, request, jsonify
from pymongo import MongoClient
from bson.objectid import ObjectId
from flask_cors import CORS, cross_origin
import datetime

app = Flask(__name__)
mongoClient = MongoClient('mongodb://root:example@mongo:27017')
db = mongoClient['forum']
CORS(app)
@app.route('/records', methods = ['POST', 'GET', 'DELETE'])
def data10():

    if request.method == 'POST':
        body = request.json
        title = body['title']
        message = body['message']
        evalution = body['evalution']
        evalution1=int(evalution)
        date = datetime.datetime.now()
        topic_id = ObjectId(body['topicId'])

        db['records'].insert_one({ 
            'title': title,
            'message': message,
            'evalution':evalution1,
            'date': date,
            'user_id': 1,
            'topic_id': topic_id
        })
        
        return jsonify({
            'status': 'Data is posted to MongoDB',
            'title': title,
            'message': message,
            'evalution':evalution1,
            'date': date,
            'user_id': 1,
            'topic_id': topic_id
        })




@app.route('/topics', methods = ['POST', 'GET', 'DELETE'])
def data1():
    if request.method == 'DELETE':
        db['topics'].delete_many({"_id":ObjectId(id)})
        return jsonify({
            "status": "Data id:" + id + "is deleted"
        })
    if request.method == 'POST':
        body = request.json
        name = body['name']

        db['topics'].insert_one({
            "name":name
           
        })
        return jsonify({
            'status':'Data is posted to MongoDB',
            'name': name         
        })
    if request.method == 'GET':
        allData = db['topics'].find()
        dataJson = []
        pipeline = [
            {
                "$group": {
                    "_id": "$topic_id",
                    "recordCount": {"$count": {}}
                }
            }
        ]
        pipeline1 = [
            {
                "$group": {
                    "_id": "$topic_id",
                    "average_rating": {"$avg": "$evalution"}
                 }
            }
        ]
        results = db['records'].aggregate(pipeline)
        results1 = db['records'].aggregate(pipeline1)
        record_counts = {}
        avg_evalution = {}
        for result in results:
            record_counts[result['_id']] = result['recordCount']   
        for result1 in results1:
            avg_evalution[result1['_id']] = result1['average_rating']   
        for data in allData:
            count = record_counts.get(data['_id'], 0)
            avg = avg_evalution.get(data['_id'], 0)
            id = data['_id']
            name = data['name']
            dataDict = {
                "id":str(id),
                "name": name,
                "count_messages": count,
                "avg_evalution":avg
            }
            print(dataDict)
            dataJson.append(dataDict)
        return jsonify(dataJson)
    
@app.route('/records/<string:id>', methods=['DELETE', 'POST'])
def onedata(id):

    
    if request.method == 'DELETE':
        db['records'].delete_many({"_id":ObjectId(id)})
        return jsonify({
            "status": "Data id:" + id + "is deleted"
        })
    
    if request.method == 'POST':
        body = request.json
        title = body['title']
        date = datetime.datetime.now()

        
        # Добавление записи в базу данных
        db['records'].insert_one({ 
            'title': title,
            'date': date
        })
        
        return jsonify({
            'status': 'Data is posted to MongoDB',
            'title': title,
            'date': date
        })

@app.route('/topics<string:id>', methods=['GET', 'DELETE'])
def onedata1(id):
    if request.method == 'GET':
        allData = db['records'].find({"topic_id":ObjectId(id)})
        dataJson = []
        for data in allData:
            id = data['_id']
            title = data['title']
            message = data['message']
            evalution = data['evalution']
            date = data['date']
            user_id = data['user_id']
            topic_id = data['topic_id']

            result = db['topics'].find_one({"_id": ObjectId(topic_id)})
            name_topic = result['name']

            dataDict = {
                "id":str(id),
                "title": title,
                "message": message,
                "evalution": evalution,
                "date": date,
                "user_id": user_id,
                "name_topic": name_topic
            }
            dataJson.append(dataDict)
        return jsonify(dataJson)
    if request.method == 'DELETE':
        db['topics'].delete_many({"_id":ObjectId(id)})
        return jsonify({
            "status": "Data id:" + id + "is deleted"
        })

@app.route('/topics/<string:id>', methods=['PUT'])
def onedata2(id):

    if request.method == 'PUT':
        body = request.json
        name = body['name']
        

        db['topics'].update_one(
            {'_id': ObjectId(id)},
            {
                "$set": {
                    "name":name
                }
            }
        )
        print('\n # Update successful # \n')
        return jsonify({'status': 'Data id: ' + id + ' is updated!'})

@app.route('/records/<string:id>', methods=['DELETE', 'PUT'])
def onedata3(id):
    
    if request.method == 'PUT':
        body = request.json
        title = body['title']
        message = body['message']
        evalution = body['evalution']
        evalution1 = int(evalution)

        
        

        db['records'].update_one(
            {'_id': ObjectId(id)},
            {
                "$set": {
                    "title":title,
                    "message":message,
                    "evalution":evalution1
                }
            }
        )
        print('\n # Update successful # \n')
        return jsonify({'status': 'Data id: ' + id + ' is updated!'})
    # DELETE a data
    if request.method == 'DELETE':
        db['records'].delete_many({'_id': ObjectId(id)})
        print('\n # Deletion successful # \n')
        return jsonify({'status': 'Data id: ' + id + ' is deleted!'})
    

@app.route('/topics<string:id>/add_record', methods=['POST'])
def onedata5(id):
    if request.method == 'GET':
        allData = db['records'].find({"topic_id":ObjectId(id)})
        dataJson = []
        for data in allData:
            id = data['_id']
            title = data['title']
            message = data['message']
            evalution = data['evalution']
            date = data['date']
            user_id = data['user_id']
            topic_id = data['topic_id']

            result = db['topics'].find_one({"_id": ObjectId(topic_id)})
            name_topic = result['name']

            dataDict = {
                "id":str(id),
                "title": title,
                "message": message,
                "evalution": evalution,
                "date": date,
                "user_id": user_id,
                "name_topic": name_topic
            }
            dataJson.append(dataDict)
        return jsonify(dataJson)
    if request.method == 'POST':
        body = request.json
        title = body['title']
        message = body['message']
        evalution = body['evalution']
        date = body['date']
        user_id = body['user_id']
        topic_id = body['topic_id']
        db['records'].insert_one({ 
            'title':title,
            'message':message,
            'evalution':evalution,
            'date': date,
            'user_id':user_id,
            'topic_id':topic_id
        })
        return jsonify({
            'status':'Data is posted to MongoDB',
            'title': title,
            'message': message,
            'evalution':evalution,
            'date': date,
            'user_id':user_id,
            'topic_id':topic_id 
        })

@app.route('/records<string:id>', methods=['GET'])
def get_record_by_id(id):
    record = db['records'].find_one({"_id": ObjectId(id)})
    if record:
        return jsonify({
            "id": str(record["_id"]),
            "title": record["title"],
            "message": record["message"],
            "evalution": int(record["evalution"])
        })
    else:
        return jsonify({"error": "Record not found"})

if __name__ == "__main__":
    app.run(debug=False)