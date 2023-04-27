const baseOption = {
    collection: "user",
    timeStamp: true,
}
module.exports = mongoose => {

    const BaseUserSchema = mongoose.models.users ||  mongoose.model(
        "users",
        mongoose.Schema(
            {
                firstName: String,
                lastName: String,
                identificationId: Number,
                password: Number,
                email: String,
                phoneNumber: Number
                // email: {
                //     type: String,
                //     trim: true,
                //     lowercase: true,
                //     unique: true,
                //     validate: {
                //         validator: function (v) {
                //             return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
                //         },
                //         message: "Please enter a valid email"
                //     },
                //     required: [true, "Email required"]
                // },

            }, baseOption)
    )
    return BaseUserSchema

}
