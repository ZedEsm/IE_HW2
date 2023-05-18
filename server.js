require("dotenv").config()
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const bodyParser = require("body-parser");
const yaml = require("yamljs")
const swaggerDoc = yaml.load("./ZEDESM19_1-Net_Project-1.0.0-swagger.yaml")


const express = require("express");
const cors = require("cors");
const rateLimit = require('express-rate-limit')

const app = express();
const corsOptions = {
    origin: "http://localhost:8081"
};
const db = require('./app/models')
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

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            description: "This is a simple API",
            version: "1.0.0",
            title: "Simple Inventory API",
            contact: {email: "you@your-company.com"},

            license: {
                name: " Apache 2.0",
                url: 'http://www.apache.org/licenses/LICENSE-2.0.html'
            },
        },
        servers: [
            {
                description: " SwaggerHub API Auto Mocking",
                url: "https://virtserver.swaggerhub.com/ZEDESM19_1/Net_Project/1.0.0"
            },
        ],
    },
    apis: ["./routes/*.js"],
};

app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerDoc)
);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
