const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

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

    console.log('TOKEN!!!');

    user.tokens.push({ access, token });
    return user.save().then(() => token);
};

// Overrides the function that returns the document to the object - this will be returned to the client in the response
UserSchema.methods.toJSON = function() {
    const user = this;
    const userObject = user.toObject();

    return _.pick(userObject, ['_id', 'email']);
};

// Creates Model Method - static method
UserSchema.statics.findByToken = function(token) {
    const secret = 'abc123';
    const User = this; // this is in model methods a model of the documents not the document itself
    let decoded;

    try {
        decoded = jwt.verify(token, secret);
    } catch(e) {
        return Promise.reject();
    }

    return User.findOne({
        _id: decoded._id,
        'tokens.token' : token,
        'tokens.access' : 'auth'
    });
};

UserSchema.statics.findByCredentials = function(email, password) {
    const User = this;
    return User.findOne({ email })
        .then(user =>{
            if(!user) {
                return Promise.reject();
            }

            return new Promise((resolve, reject) => {
                bcrypt.compare(password, user.password, (error, isPasswordCorrect) => {
                    if(isPasswordCorrect) {
                        resolve(user);
                    }
                    reject();
                })
            });
        });
};

// next - the same function as in the request (express) middleware
UserSchema.pre('save', function(next) {
    const user = this;

    // Takes the name of individual property and checks if it was modified
    if(user.isModified('password')) {
        bcrypt.genSalt(10, (error, salt) => {
            bcrypt.hash(user.password, salt, (error, hash) => {
                user.password = hash;
                next();
            });
        })
    } else {
        next();
    }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;