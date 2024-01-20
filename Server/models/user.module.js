const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 10,
  },
  email: {
    type: String,
    required: true,
    minLength: 6,
    maxLength: 20,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
    maxLength: 1024,
  },
  role: {
    type: String,
    enum: ["student", "instructor", "admin"],
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

//Schema Methods
userSchema.methods.isStudent = function () {
  return this.role == "student";
};

userSchema.methods.isInstructor = function () {
  return this.role == "instructor";
};

userSchema.methods.isAdmin = function () {
  return this.role == "admin";
};

userSchema.methods.comparePassword = function (password, callback) {
  bcrypt.compare(password, this.password, (err, isMatch) => {
    if (err) {
      return callback(err, isMatch);
    }
    callback(null, isMatch);
  });
};

//middlewares
userSchema.pre("save", async function (next) {
  if (this.isModified("password") || this.isNew) {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
    next();
  } else {
    return next();
  }
});

const User = mongoose.model("User", userSchema);
module.exports = User;
