const express =require('express');

const mongoose =require('mongoose');
const bodyParser =require('body-parser');
const Rental =require('./models/rental');
const config =require('./config/dev');
const FakeDb = require('./fake-db');
const rentalRoutes =require('./routes/rentals');
const userRoutes =require('./routes/users');
const bookingRoutes=require('./routes/bookings');
mongoose.connect('mongodb://localhost:27017/myapp').then(()=>{
    const fakeDb = new FakeDb();
    //fakeDb.seedDb();
});
const app =express();
app.use(bodyParser.json());
app.use('/api/v1/rentals',rentalRoutes);
app.use('/api/v1/users',userRoutes);
app.use('/api/v1/bookings',bookingRoutes);


const PORT =process.env.PORT||3001;
app.listen(PORT,function(){
    console.log('Iam running fine!!');
});