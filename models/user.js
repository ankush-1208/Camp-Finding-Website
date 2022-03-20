const mongoose = require('mongoose')
const passportLocalMongoose = require('passport-local-mongoose')
const { Schema } = mongoose

const userSchema = Schema({
    email: {
        type: String,
        required: true
    }
})

userSchema.plugin(passportLocalMongoose); // Will add on username password to our schema and will make sure the usernames are unique

module.exports = mongoose.model('User', userSchema);