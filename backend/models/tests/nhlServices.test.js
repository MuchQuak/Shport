const nhl = require("../sport/nhlServices");

const testData = {
  liveData: {
    linescore: {
      currentPeriod: 2,
      currentPeriodTimeRemaining: "15:00",
      intermissionInfo: {
        inIntermission: false,
      },
    },
  },
};

test("TESTING: nhlServices.parseSpecificGameInfo", async () => {
  let nhlConst = new nhl.NhlService("API endpoint");
  const parse = await nhlConst.parseSpecificGameInfo(testData);
  expect(nhlConst.host).toStrictEqual("API endpoint");
  expect(parse).toStrictEqual([2, "15:00", false]);
});
