const mongoose = require('mongoose');
const { Schema } = mongoose;

const prefsSchema = new mongoose.Schema(
  {
      user: { 
          type: Schema.Types.ObjectId, 
          ref: 'user',
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

const Pref = module.exports = mongoose.model('pref', prefsSchema);