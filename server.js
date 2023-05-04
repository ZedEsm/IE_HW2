require("dotenv").config()
const express = require("express");
const cors = require("cors");

const app = express();
const corsOptions = {
    origin: "http://localhost:8081"
};
const db = require('./app/utils')
const bodyParser = require("body-parser");
db.mongoose
    .connect(db.url)
    .then(() => {
        console.log("Connected to the database!");
    })
    .catch(err => {
        console.log("Cannot connect to the database!", err);
        process.exit();
    });
app.use(cors(corsOptions));
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
require('./app/routes/it-manager.routes')(app)
require('./app/routes/educational-manager.routes')(app)
require('./app/routes/login.routes')(app)
app.use(express.urlencoded({extended: true}));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});