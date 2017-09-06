const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        unique: true,
        validate: {
            validator: value => validator.isEmail(value),
            message: '{VALUE} is not correct email'
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    tokens: [{
        access: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true
        }
    }]
});

// Instance method definition - this is connected with particular database entry (require user object information)
UserSchema.methods.generateAuthToken = function() {
    const user = this;
    const access = 'auth';
    const secret = 'abc123';
    const token = jwt.sign({
        _id: user._id.toHexString(),
        access
    }, secret).toString();

    user.tokens.push({ access, token });
    return user.save().then(() => token);
};

// Overrides the function that returns the document to the object - this will be returned to the client in the response
UserSchema.methods.toJSON = function() {
    const user = this;
    const userObject = user.toObject();

    return _.pick(userObject, ['_id', 'email']);
};

const User = mongoose.model('User', UserSchema);

module.exports = User;