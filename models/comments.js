const mongoose = require("mongoose");

const commentsSchema = new mongoose.Schema(
    {
        article: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "News",
            required: true
        },
        name: {
            type:String,
            required:true,
            unique:true
        },
        email: {
            type:String,
            required:true
        },
        content: {
            type:String,
            required:true
        },
        status: {
            type:String,
            enum: ['approved', 'pending', 'rejected'],
            default: 'pending',
            required:true
        }
    })

    module.exports = mongoose.model("Comments", commentsSchema);