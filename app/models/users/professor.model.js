const BaseUserSchema = require("./base-user-schema");

module.exports = mongoose => {
    const Professor = new mongoose.Schema({
        college: String,
        field: String,
        rank: String,
    });

    return BaseUserSchema(mongoose).discriminator("professor", Professor);
};