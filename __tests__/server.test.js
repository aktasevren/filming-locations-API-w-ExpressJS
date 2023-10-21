

const request = require("supertest");
const app = require("../server");




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
    it("should return error - wrong imdb id", async () => {
        const res = await request(app).get("/imdbid/tt103sadasda66206");
        expect(res.body).toBe("Please check sent id value");
    });
    it("should return locations length 0 ", async () => {
        const res = await request(app).get("/imdbid/tt9362722");
        expect(res.body.length).toBe(undefined)
    });
    it("should return body equal to expected response ", async () => {
        const expectedResponse = ["127A Smithfield Road, Frederiksted, Virgin Islands", "Mansfield Reformatory - 100 Reformatory Road, Mansfield, Ohio, USA", "Butler, Ohio, USA", "Sandy Point, St. Croix, U.S. Virgin Islands", "Malabar Farm State Park - 4050 Bromfield Road, Lucas, Ohio, USA", "Wyandot County Courthouse, Upper Sandusky, Ohio, USA", "Ashland, Ohio, USA", "193 North Main Street, Mansfield, Ohio, USA", "Mansfield, Ohio, USA", "Snyder Road and Hagerman Road, Bellville, Ohio, USA", "Upper Sandusky, Ohio, USA", "Rod Bay, St Croix, USVI", "301 E 5th Street, Mansfield, Ohio, USA", "Yuma, Arizona, USA", "Bellville, Ohio, USA", "Sandusky, Ohio, USA", "Ohio, USA", "Mansfield, Shelby, Ohio, USA", "Arizona, USA", "USA"]
        const res = await request(app).get("/imdbid/tt0111161");
        expect(res.body).toEqual(expectedResponse)
    });

});
