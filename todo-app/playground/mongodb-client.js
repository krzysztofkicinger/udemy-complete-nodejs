const { MongoClient, ObjectID } = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp', (error, db) => {
    if(error) {
        console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');

    db.collection('Todos').insertOne({
        test: 'Something to do',
        completed: false
    }, (error, result) => {
        if(error) {
            console.log('Unable to insert todo', error);
        }
        console.log(JSON.stringify(result.ops, undefined, 4));
    });

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

    // FETCHING DATA
    // const cursor = db.collection('Todos').find();
    // cursor.toArray().then((docs) => {
    //     // console.log(docs);
    //     console.log(JSON.stringify(docs, undefined, 2));
    // }, (error) => {
    //     console.log(error);
    // });
    //
    // const notCompletedTodosCursor = db.collection('Todos').find({
    //     completed: false
    // });
    // notCompletedTodosCursor.toArray().then((docs) => {
    //     // console.log(docs);
    //     console.log(JSON.stringify(docs, undefined, 2));
    // }, (error) => {
    //     console.log(error);
    // });
    //
    // const todoByIdCursor = db.collection('Todos').find({
    //     _id: new ObjectID('59a417543d1e5a1bd0db3c08')
    // });
    // todoByIdCursor.toArray().then((docs) => {
    //     // console.log(docs);
    //     console.log(JSON.stringify(docs, undefined, 2));
    // }, (error) => {
    //     console.log(error);
    // });
    //
    // db.collection('Todos').find().count().then(count => {
    //     console.log(`Todos count: ${count}`)
    // });

    //deleteMany - deletes all documents that matches the criteria
    // db.collection('Todos').deleteMany({
    //     _id: new ObjectID('59a417543d1e5a1bd0db3c08')
    // }).then(result => {
    //     console.log(result);
    // });

    //deleteOne - deletes one of all objects that matches the criteria
    // db.collection('Todos').deleteOne({
    //     _id: new ObjectID('59a417543d1e5a1bd0db3c08')
    // }).then(result => {
    //     console.log(result);
    // });

    //findOneAndDelete
    // { lastErrorObject: { n: 1 },
    // value:
    // { _id: 59a417543d1e5a1bd0db3c08,
    //     test: 'Something to do',
    //     completed: false },
    // ok: 1 }

    // db.collection('Todos').findOneAndDelete({
    //     _id: new ObjectID('59a417543d1e5a1bd0db3c08')
    // }).then(result => {
    //     console.log(result);
    // });

    db.collection('Todos').findOneAndUpdate({
        _id: new ObjectID('59a41c6fd13364208ce34ab4'),
    }, {
        $set: {
            completed: true
        }
    }, {
        returnOriginal: false
    }).then(result => console.log(result));

    db.collection('Users').findOneAndUpdate({
        _id: new ObjectID('59a417cc166c2d2008801235'),
    }, {
        $inc: {
            age: 1
        }
    }, {
        returnOriginal: false
    }).then(result => console.log(result));

    db.close();
});