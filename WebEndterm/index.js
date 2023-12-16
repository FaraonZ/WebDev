const express = require('express')
const cors = require("cors");
const mongoose = require("mongoose")
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

//instantialiting express app and variables
const app = express()
const port = 4001;

app.use(express.json());
app.use(cors())

app.get("/",(req,res) => {
    console.log(req)
    res.send("App is running")
})

const postRoutes = require("./Routes/PostRoutes")   
app.use("/posts", postRoutes)  //assign Post routes to our express application


mongoose.connect("mongodb://localhost/nodeserver")
.then(() => {
    
    app.listen(port, () => {
        console.log(`Server running on http://localhost:${port}`)
    })
    console.log("Mongodb Database connected")
})
.catch((e) => {
    console.log("error::",e)
})