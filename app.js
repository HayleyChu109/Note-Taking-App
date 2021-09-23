// Node packages
const express = require("express");
const handlebars = require("express-handlebars");
const fs = require("fs");

const app = express();

// Set up public folder and middleware
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Set up handlebars
app.engine("handlebars", handlebars({ defaultLayout: "main.handlebars" }));
app.set("view engine", "handlebars");

// Set up basic authorization
const basicAuth = require("express-basic-auth");

const myAuthorizer = (users) => {
    return (username, password) => {
        return (typeof users[username] !== "undefined" && users[username] === password)
    }
};

app.use(basicAuth({
    authorizer: myAuthorizer(JSON.parse(fs.readFileSync(__dirname + "/users.json"))),
    challenge: true,
}));

// function myAuthorizer(username, password, callback) {
//     const USERS = fs.readFileSync("./users.json", "utf-8",
//         async(err, data) => {
//             if (err) {
//                 throw new Error(err)
//             } else {
//                 return await data
//             }
//         });
    
//     let parsedUsers = JSON.parse(USERS);
//     for (let i=0; i<parsedUsers.users.length; i++) {
//         if (username == parsedUsers.users[i].username && password == parsedUsers.users[i].password) {
//             return callback(null, true)
//         }
//     }
// }



// Set up note service and router
const NoteService = require("./NoteService");
const NoteRouter = require("./NoteRouter");
const noteService = new NoteService("/data.json");
const noteRouter = new NoteRouter(noteService);

// Index page
app.get("/", (req, res) => {
    noteService.listNote(req.auth.user).then((notesFromService) => {
      res.render("home", {
        user: req.auth.user,
        notes: notesFromService,
      });
    });
  });

// Router
app.use("/api/notes", noteRouter.router());


app.listen(8080, () => {
    console.log("Application listening to port 8080");
});

module.exports = app;