var mongoose = require('mongoose');


// Connect to db before tests run
// before(function(done){

    // Connect to mongodb
mongoose.connect('mongodb+srv://IsMondayTMR:CMPE195@cmpe195db-lki36.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true },function(err){
    if (err){
        console.log(err);
        return;
    }
    console.log("connect to db!");
});
