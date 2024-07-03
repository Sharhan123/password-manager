const app = require('./app')
const mongoose = require('mongoose')
const MONGO_URI = process.env.MONGO_URI

mongoose.connect(MONGO_URI)

const db = mongoose.connection

db.on('error', err => console.error(err))
db.once('open',()=>{
    console.log("db connected");
})
app.listen(5000,()=>{
    console.log("server started 3000");
})