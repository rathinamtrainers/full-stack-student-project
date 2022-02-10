// Using Express JS for faster web app development.
const express = require("express");

// Create an app using Express.
const app = express();

// Register EJS as the view engine (NOTE: jade templating is the default)
// Reference: https://expressjs.com/en/guide/using-template-engines.html
app.set("view engine", "ejs");
app.use(express.urlencoded({extended: false}));

// Make the server to listen on 3000/tcp.
app.listen(3000, () => {
    console.log("Server started on port 3000/tcp")
});

// NOTE: Student login credential is hardcoded for now in the code.
// TODO: Later we can move this data to MongoDB and then to Azure Active Directory.
const students = [
    {
        "email": "rajan@rathinamtrainers.com",
        "password": "rajan123"
    },
    {
        "email": "vipin@rathinamtrainers.com",
        "password": "vipin123"
    }
]

// When users access the server from browser, this function will return the login page.
app.get("/", (req, res) => {
    res.render("login");
})

// When student enters the credentials and click on LOGIN button in browser, this function will be invoked.
// This function will validate the credentials and provide the login process result (Succeeded/Failed).
app.post("/login", (req, res) => {
    console.log(req.body)

    var loginStatus = "Failed";
    for (let i = 0; i < students.length; i++) {
        if (req.body.email == students[i]["email"]
            && req.body.password == students[i]["password"])
        {
            loginStatus = "Succeeded"
        }
    }
    res.render("dashboard", {status: loginStatus})
})
