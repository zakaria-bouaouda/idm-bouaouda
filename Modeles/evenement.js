const mongoose = require('mongoose')
const Schema = mongoose.Schema;
// const uniqueValidator = require('mongoose-unique-validator')

let userSchema = new Schema({
    date: {
        type: Date
    },
    tache: {
        type: String,
        unique: true,
    },
    lieu: {
        type: String,
    },
    debut:{type: String},
    fin:{type: String}

},{
    collection: 'Event'
})

module.exports = mongoose.model('Event',userSchema)

