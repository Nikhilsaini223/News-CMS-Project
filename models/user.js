const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
    {
        fullName: {
            type:String,
            required:true
        },
        userName: {
            type:String,
            required:true,
            unique:true
        },
        password: {
            type:String,
            required:true
        },
        role: {
            type:String,
            enum: ['author', 'admin'],
            default: 'author',
            required:true
        }
    })

    userSchema.pre('save', async function(next) {  // Pre-save hook to hash the password before saving the user document
    if (this.isModified('password')) {             // Check if the password field has been modified (e.g., during user creation or password update)
        this.password = await bcrypt.hash(this.password, 12);  // Hash the password using bcrypt with a salt round of 12 and store the hashed password in the user document
    }
    next();
   });

    module.exports = mongoose.model("User", userSchema);