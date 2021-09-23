const NoteService = require("../NoteService");
const fs = require("fs");


describe("Testing function in note service", () => {

    beforeEach(() => {
        fs.writeFileSync("./test/test.json", "")
        this.noteService = new NoteService("/tests/test/test.json");
    });

    test("Should be able to add a note to a JSON file", () => {
        return this.noteService.addNote("Hello", "Hayley")
            .then(() => this.noteService.read()) 
            .then((notes) => {
                expect(notes).toEqual(
                    "{\"Hayley\":[\"Hello\"]}"
                );
            });
    });

    test("Should be able to list note", () => {
        return this.noteService.addNote("Hello", "Hayley")
            .then(() => this.noteService.listNote("Hayley"))
            .then((notes) => expect(notes).toEqual(["Hello"]))
    })

    test("Should be able to edit note", () => {
        return this.noteService.addNote("Hello", "Hayley")
            .then(() => this.noteService.editNote("Hello Hayley", 0, "Hayley"))
            .then(() => this.noteService.read())
            .then((notes) => {
                expect(notes).toEqual(
                    "{\"Hayley\":[\"Hello Hayley\"]}"
                )
            })
    })

    test("Should be able to remove a note", () => {
        return this.noteService.addNote("Hello", "Hayley")
            .then(() => this.noteService.deleteNote(0, "Hayley"))
            .then(() => this.noteService.read())
            .then((notes) => {
                expect(notes).toEqual(
                    "{\"Hayley\":[]}"
                )
            })
    })
})