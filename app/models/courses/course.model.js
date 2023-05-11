const baseOption = {
    collection: "courses",
    timeStamps: true,
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
                field:String
            }, baseOption)
    )


}
