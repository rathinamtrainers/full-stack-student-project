// Using Express JS for faster web app development.
const express = require("express");
const mongoose = require("mongoose");
const Login = require("./model/login")

// Create an app using Express.
const app = express();


const dbURI = "mongodb://admin:admin@127.0.0.1:27017/LMS";
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then((result) => {
        console.log("Connection MongoDB - LMS");
        // Make the server to listen on 3000/tcp.
        app.listen(3000, () => {
            console.log("Server started on port 3000/tcp")
        });
    })
    .catch((err) => {
        console.log("Error: " + err)
    })

// Register EJS as the view engine (NOTE: jade templating is the default)
// Reference: https://expressjs.com/en/guide/using-template-engines.html
app.set("view engine", "ejs");
app.use(express.urlencoded({extended: false}));



// When users access the server from browser, this function will return the login page.
app.get("/", (req, res) => {
    res.render("login");
})

// When student enters the credentials and click on LOGIN button in browser, this function will be invoked.
// This function will validate the credentials and provide the login process result (Succeeded/Failed).
app.post("/login", (req, res) => {
    console.log(req.body)
    var loginStatus = "Failed";

    Login.find({
        $and: [
            { email: req.body.email },
            { password: req.body.password }
        ]
    }).then(result => {
        console.log(result)
        if (result.length == 1) {
            loginStatus = "Success"
        }
        res.render("dashboard", {status: loginStatus})
    })
    .catch((err) => {
        console.log("Error: " + err)
    })
})
