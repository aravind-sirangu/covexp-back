const express = require('express')
const app = express()
const fs = require('fs')
const morgan = require('morgan')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const expressValidator = require('express-validator')
const dotenv = require('dotenv')
const cors = require('cors')

//local
const postRoutes = require('./routes/post')
const authRoutes = require('./routes/auth')
const userRoutes = require('./routes/users')

//
dotenv.config()
mongoose.set('useUnifiedTopology', true);
mongoose.set('useNewUrlParser', true);
mongoose.connect(process.env.MONGO_URI)
  .then(() => { console.log('DB committed') })

mongoose.connection.on('error', err => {
  console.log('DB connection error', err.message)
})

//middleware
app.use(morgan("dev"))
app.use(bodyParser.json())
app.use(expressValidator())
app.use(cors())

app.get('/api', (req, res) => {
  fs.readFile('docs/apiDocs.json', (err, data) => {
    if (err) {
      res.status(400).json({
        error: err
      });
    }
    const docs = JSON.parse(data);
    res.json(docs);
  });
});


app.use('/api', postRoutes)
app.use('/api', authRoutes)
app.use('/api', userRoutes)
app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({ error: "UnAuthorized, Please Sign In..." });
  }
});
const port = process.env.PORT || 8080

app.listen(8080, () => console.log("app is listening at 8080"))