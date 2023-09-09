const mongoose = require('mongoose');

const courseprogressSchema = new mongoose.Schema({
    CourseID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Course'
    },
    completedVideo:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'SubSection'
        }
    ]
});

module.exports = mongoose.model("CourseProgress",courseprogressSchema);