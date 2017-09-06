const jwt = require('jsonwebtoken');
const winston = require('winston');

// jwt.sign - takes the object and signs it
const data = {
    id: 10
};

const secretOrPrivateKey = '123abc';

const token = jwt.sign(data, secretOrPrivateKey);
winston.info(`Token: ${token}`);

// jwt.verify - takes the token and the secret and makes sure it was not manipulated
const decoded = jwt.verify(token, secretOrPrivateKey);
winston.info(`Decoded: ${JSON.stringify(decoded)}`);