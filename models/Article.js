const mongoose = require("mongoose")
const { schema } = require("../../mongoose/models/Article")
const Schema = mongoose.Schema
const urlSchema = new Schema({
    mainLink:{
        type:String
    },
    shortLink:{
        type:String
    },
    id:{
        type:Number
    }


})

module.exports = mongoose.model('example',urlSchema)