const Course = require("./course.model")

module.exports = mongoose => {
    const Semester = mongoose.Schema({
        course_date_time: Date,
        exam_date_time: Date,
        exam_location: String,
        professor_course: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'professor'

        },
        capacity: Number,
        academic_semester: Number,
    });
    return Course(mongoose).discriminator("semester_course", Semester);
}