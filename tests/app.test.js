const request = require("supertest");
const app = require("../app");


describe("Routes", () => {
  
    it("/ should return index page", (done) => {
      request(app)
        .get("/")
        .auth("Hayley", "123")
        .expect(200)
        .end(() => {
         done();
        })
    });

    it("/ should return 401 if not input username and password", (done) => {
      request(app)
        .get("/")
        .expect(401)
        .end((error, res) => {
          if (error) throw error;
          done();
        })
    })

    it("/ should return 401 if not input username and password", (done) => {
      request(app)
        .get("/api/notes")
        .expect(401)
        .end((error, res) => {
          if (error) throw error;
          done();
        })
    })

    it("/ should return 404 if input incorrect router", (done) => {
      request(app)
        .get("/hello")
        .auth("Hayley", "123")
        .expect(404)
        .end((error, res) => {
          if (error) throw error;
          done();
        })
    })
})