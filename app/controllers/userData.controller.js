const mongoose = require("mongoose");
const db = require("../config/db.config");
const uri = process.env.MONGODB_URI;
// const uri ="mongodb://localhost:27017/Upskilling";
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

// const userData = db.UserData;
var schema = mongoose.Schema(
    {
        userDetails: Object,
        quizDetails: Object
    },
    { timestamps: true }
);
var userData = mongoose.model("userData", schema, "user_data");

// Create and Save a new records
exports.create = (req, res) => {
    console.log(JSON.stringify(req))
    var quizDetails=new userData(req);
    quizDetails.save(function(err, doc) {
        if (err) return console.error(err);
        console.log("Document inserted succussfully!");
      });
};

exports.checkExistingUser = (async (req)=>{
  console.log(req);
  
  const users = await userData.findOne({"userDetails.email":req.email});
  if(users==null){
    return false;
  }
  else if(users!=null||users.scoreCount!=null||users.scoreCount>=0){
    return true;
  }
  else{
    return false;
  }
});