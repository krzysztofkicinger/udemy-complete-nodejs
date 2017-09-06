const logger = require('winston');
const {
    SHA256
} = require('crypto-js');

const message = 'I\'m a user number 3';
const hashedMessage = SHA256(message).toString();
logger.info(`${message} --- sha256 ---> ${hashedMessage}`);

const data = {
    id: 4
};
const salt = 'somesecret';

// Server Side
const token = {
    data,
    hash: SHA256(JSON.stringify(data) + salt).toString()
};

// Client Side
const resultHash = SHA256(JSON.stringify(token.data) + salt).toString();

// data.id = 5;
// const resultHash = SHA256(JSON.stringify(token.data) + salt).toString();

logger.info(`From token --- sha256 ---> ${token.hash}`);
logger.info(`From resultHash --- sha256 ---> ${resultHash}`);
