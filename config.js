require("dotenv").config();

const API_VERSION = "v1";
const SECRET_KEY = process.env.SECRET_KEY;
const PORT = process.env.PORT;

const DB_NAME = process.env.DB_NAME;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_SERVER_IP = process.env.DB_SERVER_IP;
const DB_PORT = process.env.DB_PORT;

const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;

const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID;
const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN;

module.exports = { API_VERSION, SECRET_KEY, PORT, 
    DB_NAME, DB_USER, DB_PASSWORD, DB_SERVER_IP, 
    DB_PORT, SENDGRID_API_KEY, TWILIO_ACCOUNT_SID, 
    TWILIO_AUTH_TOKEN };