const express = require("express");
const cors = require("cors");

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
app.use(cors(corsOptions));
app.use(express.json());
require('./app/routes/admin.routes')(app)
app.use(express.urlencoded({extended: true}));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});