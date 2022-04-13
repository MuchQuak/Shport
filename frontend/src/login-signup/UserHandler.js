import axios from "axios";

export async function addUser(user) {
  try {
    return await axios.post("http://localhost:5000/signup", user);
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function setUserPrefs(user) {
  try {
    const config = { headers: { authorization: `Bearer ${user.auth_token}` } };
    return await axios.post(
      "http://localhost:5000/preferences",
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
    return await axios.get("http://localhost:5000/username", config)
      .then((res) => {
        if (res.status === 200) {
          return res.data.username;
        }
        throw new Error("Error " + res.status + ": Could not retrieve username.");
      });
}

export async function prefsQuery(auth_token) {
  const url = "http://localhost:5000/preferences";
  const config = { headers: { authorization: `Bearer ${auth_token}` } };
  return await axios.get(url, config).then((res) => {
    if (res.status === 201) {
      return res.data;
    }
    throw new Error("Error " + res.status + ": Could not retrieve preferences.");
  });
}
