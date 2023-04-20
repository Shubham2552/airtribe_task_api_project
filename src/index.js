const express=require('express');
const bodyParser=require('body-parser');
const cors=require('cors');
const routes=require('express').Router();
const taskInfo=require('./routes/taskInfo');
const { error } = require('console');

const app=express();
app.use(cors());
app.use(routes);
app.use(bodyParser.urlencoded({extended:false}));

const PORT=3000;

routes.get('/',(req,res)=>{
    res.status(200).send("Welcome to the airtribe task project");
});

routes.use('/task',taskInfo);

app.listen(PORT,(error)=>{
    if(!error)
        console.log("Server is Successfully Running and App is listening on port "+PORT);
    else
        console.log("Error occurred, server can't start", error);
});
