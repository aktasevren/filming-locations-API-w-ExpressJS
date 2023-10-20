//https://engineering.cimri.com/modern-testing-jest-ve-react-testing-library-part1-e9fe517ac845
//https://engineering.cimri.com/modern-testing-jest-ve-react-testing-library-part-2-4e687f20f1c0

const request = require("supertest");
const app = require("./server");




describe("GET /HomePage", () => {
    it("should return status code 200", async () => {
        const res = await request(app).get("/");
        expect(res.statusCode).toBe(200);
    });
});


describe("GET /imdbid/:id", () => {
    it("should return locations length 18 ", async () => {
        const res = await request(app).get("/imdbid/tt10366206");
        expect(res.body.length).toBe(18)
    });
    it("should return status code 200 ", async () => {
        const res = await request(app).get("/imdbid/tt10366206");
        expect(res.statusCode).toBe(200);
    });
    it("should return error", async () => {
        const res = await request(app).get("/imdbid/tt103sadasda66206");
        expect(res.body).toBe("Please check sent id value");
    });

});
