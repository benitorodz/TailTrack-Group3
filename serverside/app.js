const express = require('express');
const app = express();
//use the following code on any request that matches the specified mount path
app.use((req, res, next) => {
    console.log('This line is always called');
    next();
});
app.use((req, res, next) => {
    res.send('This is the response from Express');
});

//to use this middleware in other parts of the application
module.exports=app;