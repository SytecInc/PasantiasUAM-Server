const mongoose = require("mongoose");
const express = require("express");
const app = require("./app");
const email = require("./src/services/sendgrid/email");
const PORT_SERVER = process.env.PORT || 3977;
const { API_VERSION, IP_SERVER, PORT_DB, TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN } = require("./config");

mongoose.connect(
    `mongodb://${IP_SERVER}:${PORT_DB}/project_db`,
    { useNewUrlParser: true, useUnifiedTopology: true},
    (err, res) => {
        if (err){
            throw err;
        }else {
            console.log("Success connection to db");
            app.listen(PORT_SERVER, () => {
                console.log("####################");
                console.log("######API-REST######");
                console.log("####################");
                console.log(`http://${IP_SERVER}:${PORT_SERVER}/api/${API_VERSION}/`)
            });
        }
    }

)

/* =========================TWILIO===========================*/

// const accountSid = TWILIO_ACCOUNT_SID;
// const authToken = TWILIO_AUTH_TOKEN;
// const client = require("twilio")(accountSid, authToken);

// client.messages
//   .create({
//     body: 'Prueba de Twilio',
//     from: '+12538678350',
//     to: '+573148313450',
//   })
//   .then((message) => console.log(message.sid));
  
/* ==========================================================*/

/* ========================SENDGRID==========================*/
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

// app.post('/api/email/confirmation', async (req, res, next) => {
//     try {
//         res.json(await email.sendOrder(req.body));
//     } catch (error) {
//         next(error);
//     }
// });

// app.use((err, req, res, next) => {
//     const statusCode = err.statusCode || 500;
//     console.error(err.message, err.stack);
//     res.status(statusCode).json({ message: err.message });
//     return;
// });

/* ==========================================================*/
;