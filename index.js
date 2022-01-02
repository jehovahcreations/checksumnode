const express = require('express')
const https = require('https');
  const PaytmChecksum = require('./PaytmChecksum');
const app = express()
const port = 3000

app.get('/checksum', (req, res) => {

var paytmParams = {};

paytmParams.body = {
    "requestType"   : "Payment",
    "mid"           : req.body.mid,
    "websiteName"   : "WEBSTAGING",
    "orderId"       : req.body.order,
    "callbackUrl"   : "",
    "txnAmount"     : {
        "value"     : "1.00",
        "currency"  : "INR",
    },
    "userInfo"      : {
        "custId"    : "CUST_001",
    },
};

/*
* Generate checksum by parameters we have in body
* Find your Merchant Key in your Paytm Dashboard at https://dashboard.paytm.com/next/apikeys 
*/
PaytmChecksum.generateSignature(JSON.stringify(paytmParams.body), req.body.key).then(function(checksum){
res.send(checksum)
});

})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})