const sportInfoServices = require("../models/sport/sportInfoServices");

async function getSports(req, res) {
  const sports = await sportInfoServices.getSports();
  if (sports) res.status(200).send(sports);
  else res.status(500).end();
}

async function getSport(req, res) {
  const sport = String(req.params.sport).trim().toUpperCase();
  const sp = await sportInfoServices.getSport(sport);
  if (sp) res.status(200).send(sp);
  else res.status(500).end();
}

async function getTeams(req, res) {
  const sport = String(req.params.sport).trim().toUpperCase();
  const teams = await sportInfoServices.getTeams(sport);
  if (teams) res.status(200).send(teams);
  else res.status(500).end();
}

exports.getSports = getSports
exports.getSport = getSport
exports.getTeams = getTeams
