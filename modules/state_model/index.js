var MongoClient = require('mongodb').MongoClient;

var Tasks = function(){

    var host = 'mongodb://localhost:27017/conway';
    var collectionName = 'states';
    var _db = null;

    this._connect = function(callback) {
        MongoClient.connect(host, function(err, db) {
            if (callback) {
                callback(err, db);
            } else {
                if (!err) db.close();
            }
        });
    };

    this._errResult = function(err, callback){
        if (_db) _db.close();
        callback(err);
    };

    this.drop = function(callback){
        this._connect(function(err, db){
            if (err) {
                this._errResult(err, callback);
            } else {
                _db = db;
                var collection = db.collection(collectionName);
                collection.drop(function(err){
                    if (err) {
                        this._errResult(err, callback);
                    } else {
                        db.close();
                        callback(null);
                    }
                });
            }
        });
    };

    this.push = function(state, callback){
        this._connect(function(err, db){
            if (err) {
                this._errResult(err, callback);
            } else {
                _db = db;
                var collection = db.collection(collectionName);
                collection.insertOne(state, function(err, r){
                    if (err) {
                        this._errResult(err, callback);
                    } else {
                        db.close();
                        callback(null);
                    }
                });
            }
        });
    };

    this.pop = function(callback){
        this._connect(function(err, db){
            if (err) {
                this._errResult(err, callback);
            } else {
                var collection = db.collection(collectionName);
                collection.findOneAndDelete({}, {sort:{$natural:-1}}, function(err, r){
                    if (err) {
                        this._errResult(err, callback);
                    } else {
                        db.close();
                        callback(err, r);
                    }
                });
            }
        });
    }
    
};

module.exports = new Tasks();