const baseOption = {
    collection: "course",
    timeStamp: true,
}
module.exports = mongoose => {

    return mongoose.models.courses || mongoose.model(
        "courses",
        mongoose.Schema(
            {
                name: String,
                prerequisite: String,
                co_requisite: String,
                credit: Number,

            }, baseOption)
    )

}
