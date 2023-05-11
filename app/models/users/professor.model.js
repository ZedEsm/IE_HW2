const BaseUserSchema = require("./base-user-schema");

module.exports = mongoose => {
    const Professor = new mongoose.Schema({
        college: String,
        field: String,
        rank: String,
        courses:[{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'courses'
        }],
    });

    return BaseUserSchema(mongoose).discriminator("professor", Professor);
};