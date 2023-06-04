const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const app = express();
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));

const homeStartingContent = "lorem ipsums fdf blah hdhsa";

app.get("/", function(request, response){
    response.render("home",{startingContent : homeStartingContent});
});

app.listen(3000, function(){
    console.log("Server started on port 3000");
});