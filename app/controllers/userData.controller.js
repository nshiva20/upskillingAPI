const mongoose = require("mongoose");
const db = require("../config/db.config");
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