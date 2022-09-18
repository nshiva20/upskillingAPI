const express = require('express')
const app = express()
const port = 3000
const cors = require('cors');
const bodyParser = require('body-parser');
const userDataController = require('./app/controllers/userData.controller');
const uri = process.env.MONGODB_URI;
// const mongoose = require("mongoose");
// mongoose.connect('mongodb://localhost:27017/Upskilling',
//   {
//     useUnifiedTopology: true,
//     useNewUrlParser: true
//   }
// );
const mongoose = require('mongoose')

// const uri = 'mongodb+srv://admin:admin@cluster1.mlnqlod.mongodb.net/Upskilling?retryWrites=true&w=majority';

const connectionParams = {
  useUnifiedTopology: true,
  useNewUrlParser: true
}
mongoose.connect(uri, connectionParams)
  .then(() => {
    console.log('Connected to database ')
  })
  .catch((err) => {
    console.error(`Error connecting to the database. \n${err}`);
  })

app.use(cors({
  origin: "*"
}));
app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(bodyParser.json());
app.get('/getDBConnect', (req, res) => {
  mongoose.connect(uri, connectionParams)
    .then(() => {
      console.log('Connected to database ')
      res
        .send("Connected to database")
        .end();
    })
    .catch((err) => {
      console.error(`Error connecting to the database. \n${err}`);
    })

})
app.get('/', (req, res) => {
  res
    .status(200)
    .send('Hello server is running' + uri)
    .end();
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});

app.post("/userData", (req, res) => {
  console.log("in server.js");
  // console.log(JSON.stringify(req.body))
  // res.send(200);
  var data = req.body;
  userDataController.
  userDataController.create(data, function (err, data) {
    if (err) res.json(err);
    else res.send('Successfully inserted!');
  });
});


app.post("/checkAccess",(req,res)=>{
  const data = req.body;
  // console.log(data);
  const response = userDataController.checkExistingUser(data);
  response.then((data,err)=>{
    if(err) res.json(err);
    else res.status(201).send({'response':data});
  });
  
});


// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })