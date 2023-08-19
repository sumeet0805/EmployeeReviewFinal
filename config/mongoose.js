//require the library
const mongoose=require('mongoose');
//connnecting to the database
mongoose.connect('mongodb+srv://M001-student:ratantata@sandbox.wxtju51.mongodb.net/?retryWrites=true&w=majority');

const db=mongoose.connection;
db.on('error',console.error.bind(console,'eroor connecting to the database'))
db.once('open',function(){
    console.log('Successfully connected to the databse');
}) 