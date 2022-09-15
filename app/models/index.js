// Requires official Node.js MongoDB Driver 3.0.0+
const dbConfig = require("../config/db.config.js");
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.userData = require("./userData.model.js")(mongoose);
module.exports = db;
