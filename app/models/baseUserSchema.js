const baseOption = {
    collection: "user",
    timeStamp: true,
}
module.exports = mongoose => {

    return mongoose.models.users || mongoose.model(
        "users",
        mongoose.Schema(
            {
                firstName: String,
                lastName: String,
                identificationId: {type: Number, unique: true},
                password: Number,
                email: String,
                phoneNumber: Number

            }, baseOption)
    )

}
