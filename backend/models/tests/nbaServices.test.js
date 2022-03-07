/* -- Testing nbaServices */
const nba = require('../nbaServices');


test('TESTING: nbaServices Constructor', () => {
  const nbaConst = new nba.NbaService("/NBA");

  expect(nbaConst).toStrictEqual(new nba.NbaService("/NBA"));
  });

test('TESTING: nbaServices host (endpoint)', () => {
  let nbaConst = new nba.NbaService("/NBA");

  expect(nbaConst.host).toStrictEqual("/NBA");
  });
/*
test('TESTING: nbaGamesEndPoint', () => {
  let nbaConst = new nba.NbaService("/NBA");
  let testDate = "";

  expect(nbaConst.getGamesEndPoint("")).toStrictEqual("/NBA");
  });*/