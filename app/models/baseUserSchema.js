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
                identificationId: Number,
                password: Number,
                email: String,
                phoneNumber: Number

            }, baseOption)
    )

}
