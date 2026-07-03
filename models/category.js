const mongoose = require("mongoose");

//slugify converts a string into a clean, URL-friendly slug by replacing spaces and 
//special characters with hyphens and converting it to lowercase.
const slugify = require("slugify");  // Import the slugify library to generate slugs from category names

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

    categorySchema.pre("validate", function(next) {  // Pre-validation hook to generate a slug from the category name before saving
        this.Slug = slugify(this.Name, {lower:true}); // Generate a slug from the category name and convert it to lowercase
        next();   // Call the next middleware in the stack
    });

    module.exports = mongoose.model("Category", categorySchema);