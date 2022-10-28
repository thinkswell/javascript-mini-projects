const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minLength: 3,
    },
  },
  {
    timestamps: true,
  }
);

// compile model from schema
const User = mongoose.model('User', userSchema);

module.exports = User;
