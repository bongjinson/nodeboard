const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const app = express();

let pwd = encodeURIComponent('shfwk!@12'); 
mongoose.connect(`mongodb://adibong:${pwd}@ds245523.mlab.com:45523/time`, 
	{ useNewUrlParser: true, uri_decode_auth: true});

const db = mongoose.connection;
db.once('open', () => {
	console.log("DB connection");
});

db.on('error', (err) => {
	console.log("DB error");
});

app.set("view engine", "ejs");
app.use(express.static(__dirname+ "public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("method"));

app.use("/", require("./routes/home"));

app.listen(3000, () => {console.log("server on!")})