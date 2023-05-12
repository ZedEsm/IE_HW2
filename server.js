require("dotenv").config()
const express = require("express");
const cors = require("cors");
const rateLimit = require('express-rate-limit')

const app = express();
const corsOptions = {
    origin: "http://localhost:8081"
};
const db = require('./app/models')
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
const apiLimiter = rateLimit({
    windowMs: 30 * 60 * 1000, // 30 minutes
    max: 100, // Limit each IP to 100 requests per `window` (here, per 30 minutes)
    standardHeaders: true,
    legacyHeaders: false,
})
app.use(cors(corsOptions));
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(apiLimiter)
require('./app/routes/it-manager.routes')(app)
require('./app/routes/educational-manager.routes')(app)
require('./app/routes/login.routes')(app)
require('./app/routes/student.routes')(app)
require('./app/routes/courses.routes')(app)
require('./app/routes/professor.routes')(app)

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
