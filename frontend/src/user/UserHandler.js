import axios from "axios";
import { verify } from "../util/Util";
import {BACKEND} from "../index";

export async function addUser(user) {
  try {
    return await axios.post(BACKEND + "signup", user);
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function deleteUser(auth_token) {
  const config = { headers: { authorization: `Bearer ${auth_token}` } };
  return await axios
      .delete(BACKEND + "username", config)
      .then((res) => {
        console.log(res.status);
        if (res.status === 200) {
          return verify(res);
        }
        throw new Error("Error " + res.status + ": Could not delete user.");
      });
}

export async function changePassword(auth_token, newPassword) {
  const config = { headers: { authorization: `Bearer ${auth_token}` } };
  return await axios
      .patch(BACKEND + "password", { pass: newPassword }, config)
      .then((res) => {
        console.log(res.status);
        if (res.status === 200) {
          return verify(res);
        }
        throw new Error("Error " + res.status + ": Could not change password.");
      });
}

export async function changeUsername(auth_token, newUsername) {
  const config = { headers: { authorization: `Bearer ${auth_token}` } };
  return await axios
      .patch(BACKEND + "username", { username: newUsername }, config)
      .then((res) => {
        console.log(res.status);
        if (res.status === 200) {
          return verify(res);
        }
        throw new Error("Error " + res.status + ": Could not change username.");
      });
}

export async function setUserPrefs(user) {
  try {
    const config = { headers: { authorization: `Bearer ${user.auth_token}` } };
    return await axios.post(
        BACKEND + "preferences",
      user.prefs,
      config
    );
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function usernameQuery(auth_token) {
  const config = { headers: { authorization: `Bearer ${auth_token}` } };
  return await axios
    .get(BACKEND + "username", config)
    .then((res) => {
      if (res.status === 200) {
        return verify(res);
      }
      throw new Error("Error " + res.status + ": Could not retrieve username.");
    });
}

// retrieves the user's theme name ex: "red"
export async function themeQuery(auth_token) {
  const config = { headers: { authorization: `Bearer ${auth_token}` } };
  return await axios.get(BACKEND + "theme", config).then((res) => {
    if (res.status === 200) {
      return verify(res);
    }
    throw new Error("Error " + res.status + ": Could not retrieve theme.");
  });
}

// sets theme for user given a name ex: "red"
export async function setUserTheme(user, themeName) {
  try {
    const config = { headers: { authorization: `Bearer ${user.auth_token}` } };
    return await axios.post(
        BACKEND + "theme",
      { theme: themeName },
      config
    );
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function prefsQuery(auth_token) {
  const url = BACKEND + "preferences";
  const config = { headers: { authorization: `Bearer ${auth_token}` } };
  return await axios.get(url, config).then((res) => {
    if (res.status === 201) {
      return verify(res);
    }
    throw new Error(
      "Error " + res.status + ": Could not retrieve preferences."
    );
  });
}

export async function userSportsQuery(username) {
  const url = BACKEND + "user/" + username;
  return await axios.get(url).then((res) => {
    if (res.status === 200) {
      return verify(res);
    }
    throw new Error(
        "Error " + res.status + ": Could not retrieve preferences."
    );
  });
}