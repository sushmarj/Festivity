const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
const cors= require('cors');

const eventRouter= require('./router/event.router.js');
const eventregistrationRouter = require('./router/eventregistration.router.js');
const accountRouter = require('./router/account.router.js');
const userRouter = require('./router/user.router.js');
const authRouter = require('./router/auth.router.js');
const log =require('./middleware/log.middleware');
const app = express();

mongoose.connect(config.get('mongoConnectString'));
mongoose.connection.on("connected", ()=>{
    console.log("connected to mongodb on port 27017");
})
mongoose.connection.on("error", (error)=>{
    console.log(error);
})

app.use(express.json());
app.use(cors());
app.use('/api/event', eventRouter);
app.use('/api/eventreg', eventregistrationRouter);
app.use('/api/account', accountRouter);
app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);
app.use(log);
app.use(function(req, res, next){
    console.log('time:', Date.now());
    next();
})



const port = process.env.PORT||config.get('port')
app.listen(port,()=>{
    console.log(`server is running on port ${port}`)
})