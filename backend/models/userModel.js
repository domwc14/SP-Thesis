const mongoose = require('mongoose')
const bcrypt = require ('bcrypt')
const validator = require('validator')  //regex stuff, validate if email/username and password is legit

const Schema = mongoose.Schema

const userSchema = new Schema ({
    email: {
        type:String,
        required: true,
        unique: true
    },
    password: {
        type: String, 
        required: true
    }
})

//static signup method
//creates a method called signup 
//this is for hashing the passwords

//you can't use arrow functions a
userSchema.statics.signup = async function(email,password){
    //validation 
    if(!email || !password){ 
        throw Error('All fields must be filled')
    }
    // if (!validator.isEmail(email)){
    //     throw Error('Email is not valid')
    // }
    // if(!validator.isStrongPassword(password)){
    //     throw Error('Password is weak bruh')
    // }

    if (email.length < 8) {
        throw Error('Username is too short')
      }
      if (password.length < 8) {
        throw Error('Password is too short')
      }
    
    if(validator.isAlpha(email)){
        throw Error('Username needs atleast 1 number or a symbol')
    }
    if(validator.isAlpha(password)){
        throw Error('Password needs atleast 1 number or a symbol')
    }
      


    const exists = await this.findOne({email})
    if(exists){
        throw Error('Email already exists in database') 
    }
    
    //Hashing Part
    //salt basically adds random-generated String to password
    //genSalt(num) where num is higher protection but longer to do
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password,salt)

    const user = await this.create({email,password:hash}) 
    return user
}


//LOGIN method
userSchema.statics.login = async function(email,password){
    if(!email || !password){ 
        throw Error('All fields must be filled')
    }
    const user = await this.findOne({email})
    if(!user){
        throw Error('Email does not exist in database') 
    }

    //bcryptcompare(plain text,hashed string in database)
    const match = await bcrypt.compare(password,user.password)
    if(!match){
        throw Error('Incorrect Password')
    }
    return user

}


module.exports = mongoose.model('User',userSchema)
