const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;
db.url = dbConfig.url;
db.student = require('./users/student.model.js')(mongoose)
db.professor = require('./users/professor.model')(mongoose)
db.educational_manager = require('./users/educational-manager.model')(mongoose)
db.it_manager = require('./users/it-manager.model')(mongoose)
db.approved_course = require('./courses/approved-course.model')(mongoose)
db.semester_course = require('./courses/semestre-course.model')(mongoose)

module.exports = db;