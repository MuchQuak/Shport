/* -- Testing userServices */
const mongoose = require("mongoose");
const mockingoose = require("mockingoose");
const sportInfoServices = require("../sport/sportInfoServices");
const SportSchema = require("../sport/sportSchema");

let sportModel;

beforeAll(async () => {
    sportModel = mongoose.model("sport", SportSchema.schema);
});

afterAll(async () => {

});

beforeEach(async () => {
    jest.clearAllMocks();
    mockingoose.resetAll();
});

afterEach(async () => {

});

test("Fetch all sports", async () => {
    mockingoose(sportModel).toReturn({}, 'find');
    const result = await sportInfoServices.getSports();
    expect(result).toMatchObject({});
});

test("Fetch One Sport -- Success", async () => {
    let sport = "NBA";
    mockingoose(sportModel).toReturn({}, 'findOne');
    const result = await sportInfoServices.getSport(sport);
    expect(result).toMatchObject({});
});

test("Fetch Teams By Sport -- Success", async () => {
    let sport = "NHL";
    mockingoose(sportModel).toReturn({}, 'findOne');
    const result = await sportInfoServices.getTeams(sport);
    expect(result).toMatchObject({});
});