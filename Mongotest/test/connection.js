const mongoose = require('mongoose');


// Connect to db before tests run
// before(function(done){

    // Connect to mongodb
    mongoose.connect('mongodb://localhost/CleanS',{useNewUrlParser: true});
    mongoose.connection.once('open', function(){
        console.log('Connection has been made, now make fireworks...');
        // done();
    }).on('error', function(error){
        console.log('Connection error:', error);
    });

// });
// beforeEach(function(done){
    //drop the collection
    // mongoose.connection.collections.mariochars.drop(function(){
    //     // done()
    // });
// });
