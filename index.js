const express = require("express");
const dotEnv =  require("dotenv");
const mongoose = require('mongoose');
const vendorRoutes = require('./routes/vendorRoutes');
const firmRoutes = require('./routes/firmRoutes');
const bodyParser = require("body-parser");

app = express();
const PORT = 4000;
//establishing a connection with mongodb
dotEnv.config();
mongoose.connect(process.env.MONGO_URI)
    .then(()=>{console.log("MONGODB CONNECTED0")})
    .catch((error)=>console.error(error))


app.use(express.json());

app.use(bodyParser.json())
app.use('/vendor', vendorRoutes);
app.use('/firm', firmRoutes);


app.listen(PORT, ()=>{
    console.log(`server is running on ${PORT}`)
});

app.use('/home', (req, res)=>{
    console.log("hello from home");
    res.send("hello from home");
})

app.get('/', (req, res) => {
    res.send('hiii')
})