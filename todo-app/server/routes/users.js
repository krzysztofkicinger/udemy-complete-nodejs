const Router = require('express').Router;
const User = require('../model/User');
const _ = require('lodash');
const authenticate = require('../middleware/authentication');
const router = Router();

router.post('/', (request, response) => {
    const data = _.pick(request.body, ['email', 'password']);
    if(!data.email || !data.password) {
        response.status(404).send();
    }

    const user = new User(data);
    user.save()
        .then(() => user.generateAuthToken())
        .then(token =>{
            if(!token) {
                response.status(404).send();
            }
            response
                .status(200)
                .header('x-auth', token)
                .send(user);
        }).catch(error => response.status(400).send(error));
});

/*
    The user object is set in the authenticate middleware function
 */
router.get('/me', authenticate, (request, response) => {
    return response.status(200).send(request.user);
});

module.exports = router;