const Router = require('express').Router;
const User = require('../model/User');
const _ = require('lodash');

const router = Router();

router.post('/', (request, response) => {
    const user = _.pick(request.body, ['email', 'password']);
    if(!user.email || !user.password) {
        response.status(404).send();
    }

    new User(user).save()
        .then(user => {
            if(!user) {
                response.status(404).send();
            }
            response.status(200).send(user);
        }).catch(error => response.status(400).send(error));
});

module.exports = router;