const { MongoClient, ObjectID } = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp', (error, db) => {
    if(error) {
        console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');

    // db.collection('Todos').insertOne({
    //     test: 'Something to do',
    //     completed: false
    // }, (error, result) => {
    //     if(error) {
    //         console.log('Unable to insert todo', error);
    //     }
    //     console.log(JSON.stringify(result.ops, undefined, 4));
    // });

    // db.collection('Users').insertOne({
    //     name: 'John',
    //     age: 25,
    //     location: 'Seattle'
    // }, (error, result) => {
    //     if(error) {
    //         console.log('Unable to insert todo', error);
    //     }
    //     console.log(JSON.stringify(result.ops, undefined, 4));
    // });

    const cursor = db.collection('Todos').find();
    cursor.toArray().then((docs) => {
        // console.log(docs);
        console.log(JSON.stringify(docs, undefined, 2));
    }, (error) => {
        console.log(error);
    });

    const notCompletedTodosCursor = db.collection('Todos').find({
        completed: false
    });
    notCompletedTodosCursor.toArray().then((docs) => {
        // console.log(docs);
        console.log(JSON.stringify(docs, undefined, 2));
    }, (error) => {
        console.log(error);
    });

    const todoByIdCursor = db.collection('Todos').find({
        _id: new ObjectID('59a417543d1e5a1bd0db3c08')
    });
    todoByIdCursor.toArray().then((docs) => {
        // console.log(docs);
        console.log(JSON.stringify(docs, undefined, 2));
    }, (error) => {
        console.log(error);
    });

    db.collection('Todos').find().count().then(count => {
        console.log(`Todos count: ${count}`)
    });

    db.close();
});