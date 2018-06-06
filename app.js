const express = require('express');
const app = express();
var bodyParser = require('body-parser')
var dbs = []

function dbsdo(coll, collname) {
    coll.count().then((count) => {
        if (count != 0) {
            console.log(count);
            dbs.push({
                label: collname,
                value: collname
            });

        }
    });
}
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
    extended: true
}));
app.set('view engine', 'ejs');
var MongoClient = require('mongodb').MongoClient;

app.listen(80, function() {
    console.log('listening on 80')
})
var db
app.get('/update', (req, res) => {
    MongoClient.connect("mongodb://localhost:27017/", (err, client) => {
        if (err) return console.log(err)
        db = client.db('trades')
        console.log(req.query.name);
        db.collection(req.query.name).find().toArray((err, result) => {
            if (err) return console.log(err)
            //console.log(result);
            // renders index.ejs
            var result2 = []
            var result2vol = []

            var result3vol = []
            var result3 = []
            var len = 1000;
            if (len > result.length) {
                len = result.length - 1;
            }
            for (var i = 0; i <= len; i++) {
                //console.log(result[resu]);
                try {
                    if (result[i].type == "SELL") {
                        var d = new Date(result[i].timestamp).getTime()
                        var arr = [d, result[i].price];
                        result3.push(arr);
                        var arr2 = [d, result[i].quantity];
                        result3vol.push(arr2);
                    } else {
                        var d = new Date(result[i].timestamp).getTime()
                        var arr = [d, result[i].price];
                        result2.push(arr);
                        var arr2 = [d, result[i].quantity];
                        result2vol.push(arr2);
                    }
                } catch (err) {
                    console.log(err);
                }
            }
            var json = {
                poloBuyVol: result2vol,
                poloSellVol: result3vol,
                poloBuy: result2,
                poloSell: result3
            };
            res.json(json);
            //console.log(result2);
        });
    });
});
app.post('/', (req, res) => {
    MongoClient.connect("mongodb://localhost:27017/", (err, client) => {
        if (err) return console.log(err)
        db = client.db('trades')
        console.log(req.body.Input);
        db.collection(req.body.Input).find().toArray((err, result) => {
            if (err) return console.log(err)
            //console.log(result);
            // renders index.ejs
            var result2 = []
            var result3 = []
            var len = 1000;
            if (len > result.length) {
                len = result.length - 1;
            }
            for (var i = 0; i <= len; i++) {
                try {
                    if (result[i].type == "SELL") {
                        var d = new Date(result[i].timestamp).getTime()
                        var arr = [d, result[i].price, result[i].quantity];
                        result3.push(arr);
                    } else {
                        var d = new Date(result[i].timestamp).getTime()
                        var arr = [d, result[i].price, result[i].quantity];
                        result2.push(arr);
                    }
                } catch (err) {
                    console.log(err);
                }
            }
            //console.log(result2);
            dbs = [];

            db.listCollections().toArray(function(err, collInfos) {
                // collInfos is an array of collection info objects that look like:
                // { name: 'test', options: {} }
                for (var col in collInfos) {
                    let coll = db.collection(collInfos[col].name);
                    dbsdo(coll, collInfos[col].name);
                }
                setTimeout(function() {
                    res.render('index.ejs', {
                        name: req.body.Input,
                        auto: dbs,
                        poloBuy: result2,
                        poloSell: result3
                    })
                }, 2000);
            })
        });
    })
});
app.get('/', (req, res) => {
    MongoClient.connect("mongodb://localhost:27017/", (err, client) => {
        if (err) return console.log(err)
        db = client.db('trades')
        db.collection('TRADE-BINA--ETH--BTC').find().toArray((err, result) => {
            if (err) return console.log(err)
            // renders index.ejs
            var result2 = []
            var result3 = []
            var len = 1000;
            if (len > result.length) {
                len = result.length - 1;
            }
            for (var i = 0; i <= len; i++) {
                try {
                    if (result[i].type == "SELL") {
                        var d = new Date(result[i].timestamp).getTime()
                        var arr = [d, result[i].price, result[i].quantity];
                        result3.push(arr);
                    } else {
                        var d = new Date(result[i].timestamp).getTime()
                        var arr = [d, result[i].price, result[i].quantity];
                        result2.push(arr);
                    }
                } catch (err) {
                    console.log(err);
                }
            }
            //console.log(result2);
            dbs = [];
            db.listCollections().toArray(function(err, collInfos) {
                // collInfos is an array of collection info objects that look like:
                // { name: 'test', options: {} }
                for (var col in collInfos) {
                    let coll = db.collection(collInfos[col].name);
                    dbsdo(coll, collInfos[col].name);

                }
                setTimeout(function() {

                    res.render('index.ejs', {
                        name: "TRADE-BINA--ETH--BTC",
                        auto: dbs,
                        poloBuy: result2,
                        poloSell: result3
                    })
                }, 2000);
            })
        });
    })
});