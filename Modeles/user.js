const mongoose = require('mongoose')
const Schema = mongoose.Schema;
// const uniqueValidator = require('mongoose-unique-validator')

let userSchema = new Schema({
    nom: {
        type: String
    },
    mail: {
        type: String,
        unique: true,
    },
    motdepasse: {
        type: String,
    }
},{
    collection: 'User'
})

module.exports = mongoose.model('User',userSchema)

