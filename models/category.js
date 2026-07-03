const mongoose = require("mongoose");
const slugify = require("slugify");

const categorySchema = new mongoose.Schema(
    {
        Name: {
            type:String,
            required:true,
            unique:true
        },
        Description: {
            type:String,
        },
        Slug: {
            type:String,
            required:true,
            unique:true
        },
        timestamp: {
            type:Date,
            default: Date.now
        }
    })

    categorySchema.pre("validate", function(next) {  
        this.Slug = slugify(this.Name, {lower:true});
        next();
    });

    module.exports = mongoose.model("Category", categorySchema);