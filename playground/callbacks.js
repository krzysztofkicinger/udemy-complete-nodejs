const getUser = (id, callback) => {
    const createdUser = { id, name: 'Vikram' };

    setTimeout(() => {
        callback(createdUser);
    }, 3000);
};

getUser(31, (user) => {
    console.log(user);
});