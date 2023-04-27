const BaseUserSchema = require("./baseUserSchema");

module.exports = mongoose => {
    const education_manager = new mongoose.Schema({
        college: String,
    });
    return BaseUserSchema(mongoose).discriminator("education-manager", education_manager);
};