const BaseUserSchema = require("./base-user-schema");

module.exports = mongoose => {
    const Student = new mongoose.Schema({
        degree: String,
        entryYear: Number,
        incomingSemester: Number,
        GPA: Number,
        college: String,
        field: String,
    });
    return BaseUserSchema(mongoose).discriminator("students", Student);
};