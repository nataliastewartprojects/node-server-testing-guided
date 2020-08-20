const supertest = require("supertest");
const server = require("./server.js");
const db = require("../data/dbConfig");
describe("server", () => {
  beforeEach(async () => {
    //empty table and reset primary key back to 1
    await db("hobbits").truncate();
  });
  describe("GET /", () => {
    it("should return 200 OK", () => {
      return supertest(server)
        .get("/")
        .then((res) => {
          expect(res.status).toBe(200);
        });
    });

    //testing using async/await
    it("should return 200 OK using async/await", async () => {
      const res = await supertest(server).get("/");
      expect(res.status).toBe(200);
    });
    it("should return 200 No Jest", () => {
      return supertest(server).get("/").expect(200);
    });

    //testing using --> done()
    it("should return 200 No Jest", (done) => {
      supertest(server)
        .get("/")
        .then((res) => {
          expect(res.status).toBe(200);
          done();
        });
    });
  });

  describe("POST /hobbits", () => {
    //truncate the table - clean the table to make sure is empty - happens in the beforeEach() global
    //make sure is empty, then i do my insert, then i check if the data is on the table
    //check that the data hobbot is not in the database

    //make request, send data
    it("should add hobbits", async () => {
      await supertest(server).post("/hobbits").send({ name: "gaffer" });

      //check the  hobbit data is in the database
      const hobbits = await db("hobbits");
      expect(hobbits).toHaveLength(1);
    });
  });
});

// exercise: check that the / endpoint returns an api property in the body and that the value of that property is running...

//using supertest.expect
// it("Should return api: runing...", () => {
//   return supertest(server).get("/").expect({ api: "running..." });
// });

// //using jest

// it("Should return an api property with the value of ...running", () => {
//   return supertest(server)
//     .get("/")
//     .then((res) => {
//       expect(res.body.api).toBe("running...");
//     });
// });

// it("should respond with JSON", async () => {
//   const res = await supertest(server).get("/");
//   expect(res.type).toBe(/json/);
// });
