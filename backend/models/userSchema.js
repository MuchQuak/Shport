const mongoose = require('mongoose');
const { Schema } = mongoose;

const Pref = require('./prefSchema');

var crypto = require('crypto');
const dotenv = require('dotenv');
dotenv.config();

/*
const prefsSchema = new mongoose.Schema(
  {
      user: { 
          type: Schema.Types.ObjectId, ref: 'user',
          required: false,
        },
      sports: {
          following: {
              type: Boolean,
              required: false,
              trim: true,
          },
          NBA: {
              following: {
                  type: Boolean,
                  required: false,
                  trim: true,
              },
              teams: []
          },
          NFL: {
              following: {
                  type: Boolean,
                  required: false,
                  trim: true,
              },
              teams: []
          },
          NHL: {
              following: {
                  type: Boolean,
                  required: false,
                  trim: true,
              },
              teams: []
          },
          MLB: {
              following: {
                  type: Boolean,
                  required: false,
                  trim: true,
              },
              teams: []
          }
      }
  },
  {
      collection : 'prefs'
  }
);
*/

const userSchema = new mongoose.Schema(
  {
      username: {
          type: String,
          required: true,
          trim: true,
      },
      salt: String,
      hash: String,
      email: {
          type: String,
          required: true,
          trim: true,
      },
      prefs: {
          type: Pref.schema,
          required: true
      },
      prefId: {
          type: Schema.Types.ObjectId, ref: 'pref',
          require: false
      }
  },
  {
      collection : 'users'
  }
);

userSchema.methods.setPassword = function(password) { 
     
        // Creating a unique salt for a particular user 
       this.salt = crypto.randomBytes(16).toString('hex'); 
     
       // Hashing user's salt and password with 1000 iterations, 
        
       this.hash = crypto.pbkdf2Sync(password, this.salt,  
       1000, 64, `sha512`).toString(`hex`); 
   }; 

   // Method to check the entered password is correct or not 
userSchema.methods.validPassword = function(password) { 
    var hash = crypto.pbkdf2Sync(password,  
    this.salt, 1000, 64, `sha512`).toString(`hex`); 
    return this.hash === hash; 
};

/*
userSchema.methods.createPrefs = function(password) { 
     
}; 
*/

// Exporting module to allow it to be imported in other files 
const User = module.exports = mongoose.model('user', userSchema);