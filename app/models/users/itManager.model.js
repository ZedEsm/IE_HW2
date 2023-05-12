const BaseUserSchema = require("./baseUser");

module.exports = mongoose => {
    return BaseUserSchema(mongoose).discriminator("IT-Manager", mongoose.Schema({}));
};