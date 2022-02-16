const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true
    },

    username: {
      type: String,
      unique: true,
      required: true
    },

    name: String,
    description: String,
    image: String,
    password: String,

    role: {
      type: String,
      enum: ['BEGINNER', 'INTERMEDIATE', 'ADVANCED'],
      default: 'BEGINNER',

    },

    firstTimeLoggedIn: {
      type: Boolean,
      default: true
    },

    favCryptoCurrency: [String],
  },
  {

    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
