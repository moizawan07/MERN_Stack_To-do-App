const mongoose = require('mongoose')

const schema = mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId, // Ye batata hai ke ye field ek MongoDB ID hai (24-character wala)
        ref : 'users' // Ye RelationShip bnata ha Jaise abhi tasks & users ka Beech
    },
    taskName : String,
    status : String,
    createdAt : {
        type : Date,
        default : Date.now
    }
})

let tasksModel = mongoose.model('tasksModel', schema)

module.exports = tasksModel