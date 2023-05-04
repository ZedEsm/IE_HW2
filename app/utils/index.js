const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;
db.url = dbConfig.url;
db.student = require('../models/users/student.model.js')(mongoose)
db.professor = require('../models/users/professor.model')(mongoose)
db.educational_manager = require('../models/users/educational-manager.model')(mongoose)
db.it_manager = require('../models/users/it-manager.model')(mongoose)
db.approved_course = require('../models/courses/approved-course.model')(mongoose)
db.semester_course = require('../models/courses/semestre-course.model')(mongoose)
db.course = require('../models/courses/course.model')(mongoose)
db.users = require('../models/users/base-user-schema')(mongoose)

module.exports = db;