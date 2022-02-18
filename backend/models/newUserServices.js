const mongoose = require('mongoose');
var crypto = require('crypto');
const dotenv = require('dotenv');
dotenv.config();

const newTestUserSchema = new mongoose.Schema({
    username: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
        type: String,
        trim: true,
    },
    salt: String,
    hash: String,
    pref: { 
        type: Object,
        trim: true,
        required: true
    },
  }, {collection : 'users'});

newTestUserSchema.methods.setPassword = function(password) { 
     
        // Creating a unique salt for a particular user 
       this.salt = crypto.randomBytes(16).toString('hex'); 
     
       // Hashing user's salt and password with 1000 iterations, 
        
       this.hash = crypto.pbkdf2Sync(password, this.salt,  
       1000, 64, `sha512`).toString(`hex`); 
   }; 

   // Method to check the entered password is correct or not 
newTestUserSchema.methods.validPassword = function(password) { 
    var hash = crypto.pbkdf2Sync(password,  
    this.salt, 1000, 64, `sha512`).toString(`hex`); 
    return this.hash === hash; 
}; 


// Exporting module to allow it to be imported in other files 
const User = module.exports = mongoose.model('User', newTestUserSchema); 




