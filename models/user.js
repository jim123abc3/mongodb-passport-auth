const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

//Define our model
const userSchema = new Schema({
  email: { type: String, unique: true, lowercase: true },
  password: String,
});

//on save Hook, encrypt password
userSchema.pre("save", function (next) {
  const user = this;

  bcrypt.genSalt(10, function(err, salt) {
    if (err) return next(err);

    // hash the password using our new salt
    bcrypt.hash(user.password, salt, function(err, hash) {
        if (err) return next(err);
        // override the cleartext password with the hashed one
        user.password = hash;
        next();
    });
});
});

userSchema.methods.comparePassword = function (candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
    if (err) {
      return callback(err);
    }

    callback(null, isMatch);
  });
};

//Create the model class
const ModelClass = mongoose.model("user", userSchema);

//Export the model

module.exports = ModelClass;
