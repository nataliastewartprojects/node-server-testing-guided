const supertest = require("supertest");
const server = require("./server.js");
describe("server", () => {
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
});

// exercise: check that the / endpoint returns an api property in the body and that the value of that property is running...

//using supertest.expect
it("Should return api: runing...", () => {
  return supertest(server).get("/").expect({ api: "running..." });
});

//using jest

it("Should return an api property with the value of ...running", () => {
  return supertest(server)
    .get("/")
    .then((res) => {
      expect(res.body.api).toBe("running...");
    });
});

it("should respond with JSON", async () => {
  const res = await supertest(server).get("/");
  expect(res.type).toBe(/json/);
});
