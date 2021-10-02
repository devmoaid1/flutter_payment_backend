const functions = require("firebase-functions");
const express=require("express"); 
const paymentsRoutes=require("./api/routes/paymentsRouter")

const app=express(); 

app.use(express.json()) 


app.use('/payments',paymentsRoutes)



exports.app = functions.https.onRequest(app);

exports.functionsTimeOut = functions.runWith({
    timeoutSeconds: 300,
  });
exports.setupdb = functions.https.onRequest(require("./api/setupDb"));


