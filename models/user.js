const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const {Schema} = mongoose;

const userSchema = new Schema({
  image:{
    public_id:{
      type:String
    },
    url:{
      type:String
    }
  },
  email:{
    type: String,
    required:true,
    unique:true
  },
  password:{
    type: String,
    required:true,
    select:false
  },
  role:{
    type: String,
    required:true,
    enum:['user','admin'],
    default:'user'
  },
  posts:[{
    type: Schema.Types.ObjectId,
    ref: "Post"
  }],
})

//hashing password in  mongoose middleware before saving user in db(document middleware)
userSchema.pre('save', async function(){
  const currentUser = this;
  if(currentUser.isModified('password')){
    const hashedPassword = await bcrypt.hash(currentUser.password,10)
    currentUser.password = hashedPassword
  }
})

const User = mongoose.model('User',userSchema);
module.exports =User;
