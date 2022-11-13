const mongoose = require("mongoose");
const express = require("express");
const app = require("./app");

const { API_VERSION, PORT } = require("./config");

const PORT_SERVER = PORT || 3977;
const { DB_NAME, DB_USER, DB_PASSWORD, DB_SERVER_IP, DB_PORT } = require("./config");
mongoose.connect(
    `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_SERVER_IP}:${DB_PORT}/${DB_NAME}`,
    { useNewUrlParser: true, useUnifiedTopology: true},
    (err, res) => {
        if (err){
            throw err;
        }else {
            console.log("Connected to MongoDB database.");
            app.listen(PORT_SERVER, () => {
                console.log("####################");
                console.log("######API-REST######");
                console.log("####################");
                console.log(`http://${DB_SERVER_IP}:${PORT_SERVER}/api/${API_VERSION}/`)
            });
        }
    }

);

/* =========================TWILIO===========================*/

// const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN } = require("./config");
// const client = require("twilio")(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

// client.messages
//   .create({
//     body: 'Prueba de Twilio',
//     from: '+12538678350',
//     to: '+573148313450',
//   })
//   .then((message) => console.log(message.sid));

/* ==========================================================*/

/* ========================SENDGRID==========================*/
// const email = require("./src/services/sendgrid/email");
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