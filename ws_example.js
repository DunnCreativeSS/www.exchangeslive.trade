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
								var chans = {};
								var channels = [];
		var donez = []
		var labels = []
		var markets = []
		var marketzeroes = []
	function dothatthing(i, datachan, dbo){
		//console.log(i);
		//console.log(datachan);
		if (datachan.startsWith("TRADE-BINA")){
	chans[i] = SCsocket.subscribe(datachan);
	//console.log(chans[i]);
											chans[i].watch(function(data) {
												if (data.err){
													console.log(data.err);
												}
												if (data.err_num){
													console.log(data.err_num);
												}
												if (data.label){
													//console.log(data.label);
													try{
														if (!labels.includes(data.label)){
												console.log(data.exchange);
															labels.push(data.label);
														console.log(data.label);
														}
												dbo.collection(data.channel).insert(data, function(err, res) {
													//if (err) throw err;
													
												});
												 }catch(err){console.log(err);}

													}
													else if (data.market){
														if (!markets.includes(data.market)){
												console.log(data.exchange);
															markets.push(data.market);
														console.log(data.market);
														}
														try{
												dbo.collection('TRADE-' + data.exchange + '--' + data.market.split('/')[0] + '--' + data.market.split('/')[1] ).insert(data, function(err, res) {
													//if (err) throw err;
										   
												});
												 }catch(err){console.log(err);}

													}
													else {
														
														if (!marketzeroes.includes(data[0].market)){
												console.log(data[0].exchange);
															marketzeroes.push(data[0].market);
														console.log(data[0].market);
														}
														try{
												dbo.collection('TRADE-' + data[0].exchange + '--' + data[0].market.split('/')[0] + '--' + data[0].market.split('/')[1] ).insertMany(data, function(err, res) {
													//if (err) throw err;
											
												});
												 }catch(err){console.log(err);}

														
													}
													
											});
											var done = false;
											console.log(channels.length);
											console.log(donez.length);
											if (donez.length != channels.length){
											while (done == false){
												var try2 = Math.floor(Math.random() * channels.length);
												if (!donez.includes(try2)){
												console.log('try: ' + try2);
													done = true;
		donez.push(try2);
											setTimeout(function(){
											
											dothatthing(try2, channels[try2], dbo);
											}, 1);
												}
											}
											}else {
												console.log('woo');
											}
		}else{
			var done = false;
											console.log(channels.length);
											console.log(donez.length);
											if (donez.length != channels.length){
											while (done == false){
												var try2 = Math.floor(Math.random() * channels.length);
												if (!donez.includes(try2)){
												console.log('try: ' + try2);
													done = true;
		donez.push(try2);
											setTimeout(function(){
											
											dothatthing(try2, channels[try2], dbo);
											}, 1);
												}
											}
											}else {
												console.log('woo');
											}
		}
	}
		console.log(options);
		var SCsocket = socketCluster.connect(options);
		var MongoClient = require('mongodb').MongoClient;
		var url = "mongodb://localhost:27017/trades";

		SCsocket.on('connect', function(status) {

			console.log(status);

			SCsocket.on('error', function(err) {
				console.log(err);
			});


			SCsocket.emit("auth", api_credentials, function(err, token) {

				if (!err && token) {

					MongoClient.connect(url, function(err, db) {
						SCsocket.emit("channels", null, function(err, data) {
							if (!err) {
	var len = data.length;

								for (var chan in data) {
									
									if (data[chan].channel.startsWith('TRADE')) {
										channels.push(data[chan].channel);
									}
								}
										if (err) throw err;
										var dbo = db.db('trades')
										console.log(data[chan].channel);
										// // // // // /// // //dbo.createCollection(data[chan].channel, function(err, res) {
											//if (err) throw err;
											//console.log("Collection created!");
											var sc = SCsocket.subscribe("TRADE-BINA--ETH--BTC");
	//console.log(chans[i]);
											sc.watch(function(data) {
												if (data.err){
													console.log(data.err);
												}
												if (data.err_num){
													console.log(data.err_num);
												}
												if (data.label){
													//console.log(data.label);
													try{
														if (!labels.includes(data.label)){
												console.log(data.exchange);
															labels.push(data.label);
														console.log(data.label);
														}
												dbo.collection(data.channel).insert(data, function(err, res) {
													//if (err) throw err;
													
												});
												 }catch(err){console.log(err);}

													}
													else if (data.market){
														if (!markets.includes(data.market)){
												console.log(data.exchange);
															markets.push(data.market);
														console.log(data.market);
														}
														try{
												dbo.collection('TRADE-' + data.exchange + '--' + data.market.split('/')[0] + '--' + data.market.split('/')[1] ).insert(data, function(err, res) {
													//if (err) throw err;
										   
												});
												 }catch(err){console.log(err);}

													}
													else {
														
														if (!marketzeroes.includes(data[0].market)){
												console.log(data[0].exchange);
															marketzeroes.push(data[0].market);
														console.log(data[0].market);
														}
														try{
												dbo.collection('TRADE-' + data[0].exchange + '--' + data[0].market.split('/')[0] + '--' + data[0].market.split('/')[1] ).insertMany(data, function(err, res) {
													//if (err) throw err;
											
												});
												 }catch(err){console.log(err);}

														
													}
													
												
											});
											setTimeout(function(){
						dothatthing(0, channels[0], dbo);
											}, 3000);
										// // // // // // //});

							} else {
								console.log(err)
							}
						});

					});

					/*
								var scChannel = SCsocket.subscribe("TRADE-PLNX--BTC--ETH");
								console.log(scChannel);
								scChannel.watch(function (data) {
									MongoClient.connect(url, function(err, db) {
					  if (err) throw err;
					  var dbo = db.db("trades");
							dbo.collection("polo").insert(data, function(err, res) {
										if (err) throw err;
						});
					  
										
									console.log(data);
									});
								});      */
					/*
				SCsocket.emit("exchanges", null, function (err, data) {
					if (!err) {                  
						console.log(data);
					} else {
						console.log(err)
					}   
				});
				SCsocket.emit("ORDER-BITF--ETH--BTC", null, function (err, data) {
					if (!err) {                  
						console.log(data);
					} else {
						console.log(err)
					}   
				});
				
				}); 
				*/
				} else {
					console.log(err)
				}
			});
		});

