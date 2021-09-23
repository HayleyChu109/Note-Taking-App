const NoteRouter = require("../NoteRouter");

let noteService;
let noteRouter;
let res;

describe("The note router should call relatve method in response to request from browser", () => {
    beforeEach(() => {
        noteService = {
            listNote: jest.fn().mockResolvedValue(true),
            addNote: jest.fn().mockResolvedValue(true),
            editNote: jest.fn().mockResolvedValue(true),
            deleteNote: jest.fn().mockResolvedValue(true),
        };

        noteRouter = new NoteRouter(noteService);

        res = {
            status: jest.fn().mockResolvedValue(200),
            json: () => {
                return "Hello";
            }
        };
    });

    test("the note router should call listNote in response to a GET request", (done) => {
        noteRouter
            .get({auth: {user: "Hayley"}}, res)
                .then(() => {
                    expect(noteService.listNote).toHaveBeenCalledWith("Hayley");
                    done();
                })
    })

    test("the note router should call addNote in response to a POST request", (done) => {
        noteRouter
            .post({body: {inputNote: "Hello"}, auth: {user: "Hayley"}}, res)
                .then(() => {
                    expect(noteService.addNote).toHaveBeenCalledWith("Hello", "Hayley");
                    expect(noteService.listNote).toHaveBeenCalledWith("Hayley");
                    done();
                })
    })

    test("the note router should call editNote in response to a PUT request", (done) => {
        noteRouter
            .put({body: {inputNote: "Hello"}, params: {index: 0}, auth: {user: "Hayley"}}, res)
                .then(() => {
                    expect(noteService.editNote).toHaveBeenCalledWith("Hello", 0, "Hayley");
                    expect(noteService.listNote).toHaveBeenCalledWith("Hayley");
                    done();
                })
    })

    test("the note router should call deleteNote in response to a DELETE request", (done) => {
        noteRouter
            .delete({params: {index: 0}, auth: {user: "Hayley"}}, res)
                .then(() => {
                    expect(noteService.deleteNote).toHaveBeenCalledWith(0, "Hayley");
                    expect(noteService.listNote).toHaveBeenCalledWith("Hayley");
                    done();
                })
    })
})