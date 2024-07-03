const express = require('express')
const app = express()
const cors = require('cors')
const morgan = require('morgan')
const userRouter = require('./routers/userRouter')
const path = require('path')
require('dotenv').config();


app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors({
    origin: function(origin, callback) {
      callback(null, true); 
    }
  }));

  app.get('/', function(req, res){
    res.json({message:'ready'})
  })

app.use('/api/user',userRouter)

module.exports = app;
