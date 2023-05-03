const BaseUserSchema = require("./course.model");

module.exports = mongoose => {
    return BaseUserSchema(mongoose).discriminator("approved-course", mongoose.Schema({

    }));
};