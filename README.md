"# www.exchangeslive.trade"

http://www.exchangeslive.trade

Edit create.js and ws_example.js

Add your Coinigy API key and secret here:

 var api_credentials = {
        "apiKey": "",
        "apiSecret": ""
    } 

edit ws_example.js

change this line to whichever exchange you want the site to work on:

if (datachan.startsWith("TRADE-BINA")) {

Note that 'BINA' is short for Binance. To get a list of exchange codes, get your socket to emit to 'exchanges.' Change the above line to 'TRADE-' to work on all exchanges, but keep in mind it doesn't like creating 4000+ socket subscriptions :)