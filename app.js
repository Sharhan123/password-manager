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

const corsOptions = {
  origin:'https://password-manager-ui-7zfb.vercel.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

  app.get('/', function(req, res){
    res.json({message:'ready'})
  })

app.use('/api/user',userRouter)

module.exports = app;
