const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.student = require('./student.model.js')(mongoose)
db.professor = require('./professor.model')(mongoose)
db.educational_manager = require('./educationalManager.model')(mongoose)
module.exports = db;