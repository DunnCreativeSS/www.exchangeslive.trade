var socketCluster = require('socketcluster-client');

    var api_credentials = {
        "apiKey": "6b66d8f062852f23f81591c58599bfea",
        "apiSecret": "dae1b99363db92cd6d847124dbd73d52"
    }

    var options = {
        hostname: "sc-02.coinigy.com",
        port: "443",
        secure: "true"
    };

    console.log(options);
    var SCsocket = socketCluster.connect(options);
    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://localhost:27017/trades";

    SCsocket.on('connect', function(status) {

        console.log(status);

        SCsocket.on('error', function(err) {
            console.log(err);
        });

var c = [];
        SCsocket.emit("auth", api_credentials, function(err, token) {

            if (!err && token) {
                console.log(token)
                MongoClient.connect(url, function(err, db) {
                    SCsocket.emit("channels", null, function(err, data) {
                        if (!err) {
                            var chans = [];
                            var i = 0;
                            for (var chan in data) {
                                //if (data[chan].channel.startsWith('TRADE-PLNX')) {
									if (data[chan].channel.split('--')[1] == "BTC" || data[chan].channel.split('--')[2] == "BTC"){
                                    if (err) throw err;
                                    var dbo = db.db('trades')
console.log(chan);
console.log(data.length);
                           //      console.log(data[chan].channel);
if (!c.includes(data[chan].channel)){
c.push(data[chan].channel);

//setTimeout(function(){
                                    dbo.createCollection(data[chan].channel, function(err, res) {
                                                                          if (err) throw err;
						//console.log(res);
                                      })
//}, Math.random() * 1 * data.length);
}
                               // }
								}
                            }
                        }
                    });
                });
            }
        });
    })


