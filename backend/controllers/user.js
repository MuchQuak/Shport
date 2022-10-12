const {decode, generateAccessToken}  = require('../utility');
const userServices = require("../models/user/userServices");

async function signup(req, res) {
  const user = req.body;

  if (!user.username && !user.password && !user.email) {
    res.status(400).send("Bad Request: Invalid input data");
  } else {
    if (!(await userServices.validate(user))) {
      res.status(409).send("Username or Email mail already taken");
    } else {
      const savedUser = await userServices.signUpUser(user);

      if (savedUser) {
        const token = generateAccessToken(user.username);
        res.status(201).send(token);
      } else {
        res.status(500).end("Server Error");
      }
    }
  }
}

//TODO FIGURE out what this is
async function getUserPrefs(req, res) {
  const username = req.params["username"];
  if (username) {
    const userprefs = await userServices.getUserSports(username);
    if (userprefs) {
      res.status(200).send(userprefs);
      return;
    }
    res.status(404).end("User not found");
  }
}

async function getUsername(req, res) {
  const decodedUser = decode(req);
  if (decodedUser) {
    res.status(200).send(decodedUser.username);
  } else {
    res.status(404).end("User not found");
  }
}

async function deleteUser(req, res) {
  const decodedUser = decode(req);
  if (decodedUser) {
    const deleted = await userServices.deleteUser(decodedUser);
    if (deleted){
      res.status(200).send("Deleted User");
    } else {
      res.status(400).end("Error! User not deleted");
    }
  } else {
    res.status(404).end("User not found");
  }
}

async function patchUsername(req, res) {
  const decodedUser = decode(req);
  if (decodedUser) {
    decodedUser.newUsername = req.body.username;
    const updated = await userServices.changeUsername(decodedUser);
    if (updated){
      res.status(200).send("Changed Username");
    } else {
      res.status(400).end("Error! Username not changed");
    }
  } else {
    res.status(404).end("User not found");
  }
}

async function patchPassword(req, res) {
  const decodedUser = decode(req);
  if (decodedUser) {
    decodedUser.newPassword = req.body.pass;
    const updated = await userServices.changePassword(decodedUser);
    if (updated){
      res.status(200).send("Changed Password");
    } else {
      res.status(400).end("Error! Password not changed");
    }
  } else {
    res.status(404).end("User not found");
  }
}

async function getTheme(req, res) {
  const decodedUser = decode(req).username;
  const theme = (await userServices.getUserPreferences(decodedUser)).prefs
    .theme;
  if (decodedUser && theme) {
    res.status(200).send(theme);
  } else {
    res.status(404).end("User not found");
  }
}

async function login(req, res) {
  const user = req.body;
  if (user.username && user.password) {
    const result = await userServices.login(user);
      console.log(result)
    if (result) {
      const token = generateAccessToken(user.username);
      res.status(201).send(token);
    } else {
      res.status(401).end("Unauthorized");
    }
  } else {
    res.status(400).end("Bad Request");
  }
}


async function getPrefs(req, res) {
  const decodedUser = decode(req);
  if (decodedUser) {
    const username = decodedUser.username;
    const userPref = await userServices.getUserPreferences(username);
    if (userPref) {
      res.status(201).send(userPref.prefs);
    }
  }
  res.status(500).end();
}

async function postPrefs(req, res) {
  const decodedUser = decode(req);
  if (decodedUser) {
    const username = decodedUser.username;
    const prefs = req.body;
    const userPref = await userServices.setUserPreferences(username, prefs);
    if (userPref) {
      res.status(201).send(userPref);
    }
  }
  res.status(500).end();
}

async function postTheme(req, res) {
  const decodedUser = decode(req);
  if (decodedUser) {
    const username = decodedUser.username;
    const theme = req.body;
    const userPref = await userServices.setUserTheme(username, theme.theme);
    if (userPref) {
      res.status(201).send(userPref);
    }
  }
  res.status(500).end();
}

exports.signup = signup;
exports.getUserPrefs = getUserPrefs;
exports.getUsername = getUsername;
exports.deleteUser = deleteUser;
exports.patchUsername = patchUsername;
exports.patchPassword = patchPassword;
exports.getTheme = getTheme;
exports.login = login;
exports.getPrefs = getPrefs;
exports.postPrefs = postPrefs;
exports.postTheme = postTheme;
