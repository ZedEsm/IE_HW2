const BaseUserSchema = require("./base-user-schema");

module.exports = mongoose => {
    const education_manager = new mongoose.Schema({
        college: String,
    });
    return BaseUserSchema(mongoose).discriminator("education-manager", education_manager);
};