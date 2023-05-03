const BaseUserSchema = require("./base-user-schema");

module.exports = mongoose => {
    return BaseUserSchema(mongoose).discriminator("IT-Manager", mongoose.Schema({}));
};