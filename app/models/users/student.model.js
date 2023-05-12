const BaseUserSchema = require("./baseUser");

module.exports = mongoose => {
    const Student = new mongoose.Schema({
        degree: String,
        entryYear: Number,
        incomingSemester: Number,
        GPA: Number,
        college: String,
        field: String,
        courses:[{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'courses'
        }],
    });
    return BaseUserSchema(mongoose).discriminator("students", Student);
};