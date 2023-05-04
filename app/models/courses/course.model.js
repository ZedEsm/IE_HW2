const baseOption = {
    collection: "courses",
    timeStamp: true,
}
module.exports = mongoose => {

    return mongoose.models.courses || mongoose.model(
        "courses",
        mongoose.Schema(
            {
                name: String,
                prerequisite: [{
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'courses'
                }],
                co_requisite: [{
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'courses'
                }],
                credit: Number,
                course_type: {
                    type: String,
                    enum: ['APPROVED','SEMESTER']
                },
            }, baseOption)
    )


}
