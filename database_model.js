const mongoose =require('mongoose');
const bcrypt= require('bcrypt');
const userSchema= new mongoose.Schema({
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    contactNumber:String,
    preferences:{
        roomType:String,
        additionalRequirements:String

    },
    accountStatus:{type:String,default:'active',enum:['active','suspended']},
    bookings:[{type: mongoose.Schema.Types.ObjectId, ref:'Booking'}],
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }]

});
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});
userSchema.methods.comparePassword = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;