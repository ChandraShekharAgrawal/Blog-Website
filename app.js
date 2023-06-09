const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const lodash = require("lodash");

const app = express();
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));

const homeStartingContent = "lorem ipsums fdf blah hdhsa";
const aboutContent = "hi this is about sefction. Rope's end spirits squiffy yawl Plate Fleet Chain Shot run a rig gangway scuttle warp. Mutiny chandler me black jack bilge rat Barbary Coast grapple coffer sloop quarter. Cat o'nine tails Spanish Main loaded to the gunwalls spirits stern jack Sail ho pink smartly gally.";
const contactContent = "Roquefort cheeseburger cheese triangles. Monterey jack bavarian bergkase taleggio say cheese red leicester cheesy feet parmesan rubber cheese. Brie macaroni cheese croque monsieur cottage cheese paneer feta st. agur blue cheese when the cheese comes out everybody's happy. Cheese on toast squirty cheese brie everyone loves macaroni cheese babybel monterey jack cottage cheese.";

const posts = [];

app.get("/", function(request, response){
    response.render("home",{startingContent : homeStartingContent, postContent: posts});
    // console.log(posts);
});

app.get("/about", function(request, response){
    response.render("about",{startingContent : aboutContent});
});

app.get("/contact", function(request, response){
    response.render("contact",{startingContent : contactContent});
});

app.get("/compose", function(request, response){
    response.render("compose");
});

app.post("/compose", function(request, response){
    const userPost = {
        title: request.body.title,
        post : request.body.post
    };
    posts.push(userPost);
    response.redirect("/");
});

app.get("/posts/:postName", function(request, response){
    const requestedTitle = request.params.postName;
    let flag = 0;
    for(let i=0; i< posts.length; i++){
        if(lodash.lowerCase(posts[i].title) === lodash.lowerCase(requestedTitle)){
            console.log(posts[i].title);
            response.render("post", {Title: posts[i].title, Post: posts[i].post});
            flag = 1;
            break;
        }
    }
    if(flag === 0){
        console.log("Match not found");
    }
});

app.listen(3000, function(){
    console.log("Server started on port 3000");
});