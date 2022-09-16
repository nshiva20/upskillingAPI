const mongoose = require("mongoose");
const db = require("../config/db.config");
const uri = process.env.MONGODB_URI;
mongoose.connect(uri, connectionParams)
  .then(() => {
    console.log('Connected to database ')
  })
  .catch((err) => {
    console.error(`Error connecting to the database. \n${err}`);
  })
// const userData = db.UserData;
var schema = mongoose.Schema(
    {
        userDetails: Object,
        quizDetails: Object
    },
    { timestamps: true }
);
var userData = mongoose.model("model", schema, "user_data");

// Create and Save a new records
exports.create = (req, res) => {
    console.log(JSON.stringify(req))
    var quizDetails=new userData(req);
    quizDetails.save(function(err, doc) {
        if (err) return console.error(err);
        console.log("Document inserted succussfully!");
      });
};