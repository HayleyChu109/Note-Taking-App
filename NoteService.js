const fs = require("fs");

class NoteService {
    constructor(file) {
        this.file = file;
        this.notes;
        this.init();
    }

    init() {
        return new Promise((res, rej) => {
            let notes = fs.readFileSync(__dirname + this.file, "utf-8");
            if (Object.entries(notes).length > 0) {
                this.notes = JSON.parse(notes);
                res();
            } else {
                this.notes = {};
                res();
            }
        })
    }

    write(string) {
        return new Promise((res, rej) => {
            fs.writeFile(__dirname + this.file, string, (error) => {
                if (error) {
                    console.log(error);
                    rej(error)
                } else {
                    res(this.file);
                }
            });
        });
    }

    read() {
        return new Promise((res, rej) => {
            fs.readFile(__dirname + this.file, "utf-8", (error, data) => {
                if (error) {
                    console.log(error);
                    rej(error);
                } else {
                    res(data);
                }
            });
        });
    }

    // List note
    listNote(user) {
        return this.read().then((notes) => {
            let parsedNote = JSON.parse(notes);
            console.log(parsedNote[user])
            return parsedNote[user];
        })
    }

    // Adding note
    addNote(note, user) {
        return this.init().then(() => {
            if (typeof this.notes[user] === "undefined") {
                this.notes[user] = [];
            }
            this.notes[user].push(note);
            let string = JSON.stringify(this.notes);
            return this.write(string);
        });
    }

    // Update note
    editNote(note, index, user) {
        return this.init().then(() => {
            this.notes[user][index] = note;
            let string = JSON.stringify(this.notes);
            return this.write(string);
        })
    }

    // Delete note
    deleteNote(index, user) {
        return this.init().then(() => {
            this.notes[user].splice(index, 1);
            let string = JSON.stringify(this.notes)
            return this.write(string);
        })
    }
}

module.exports = NoteService;