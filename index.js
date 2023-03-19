const mongoose = require("mongoose");
const app = require("./app");

const { API_VERSION, PORT } = require("./config");
const PORT_SERVER = PORT;
const { 
    DB_NAME, 
    DB_USER, 
    DB_PASSWORD, 
    DB_SERVER_IP, 
    DB_PORT 
} = require("./config");

mongoose.connect(
    `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_SERVER_IP}:${DB_PORT}/${DB_NAME}`,
    { useNewUrlParser: true, useUnifiedTopology: true},
    (err, res) => {
        if (err){
            throw err;
        }else {
            console.log("Connected to MongoDB database.");
            app.listen(PORT_SERVER, () => {
                console.log("Server running on: ");
                console.log(`   http://${DB_SERVER_IP}:${PORT_SERVER}/api/${API_VERSION}/`)
            });
        }
    }

);