
const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const userSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String,
    cpassword: String,
    
})
userSchema.pre('save', async function(next)
{
    if(this.isModified('password'))
    {
        this.password= await bcrypt.hash(this.password,12);
        this.cpassword= await bcrypt.hash(this.cpassword,12);

    }
    next();
})


module.exports = mongoose.model("User", userSchema);