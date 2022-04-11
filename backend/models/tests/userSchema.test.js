/* -- Testing userSchema */
const User = require("../user/userSchema");
const Pref = require("../user/prefSchema");

test("TESTING: Entire User Schema", () => {
  let username = "Pepe";
  let email = "pepe@gmail.com";
  let password = "Sample--4$#4--Password";

  dummyUser = {
    username: username,
    email: email,
    password: password,
  };

  let newUser = new User(dummyUser);

  expect(username).toBe(newUser.username);
  expect(email).toBe(newUser.email);
});

test("TESTING: Pref", () => {
  let user = {
    username: "Chuck Norris",
    email: "chuck@gmail.com",
  };

  let userToAdd = new User(user);

  let userPrefs = new Pref({
    user: userToAdd._id,
    sports: {
      following: true,
    },
  });

  userToAdd.prefId = userPrefs._id;

  userToAdd.setPassword("Sample$aa");

  expect(userToAdd._id).toStrictEqual(userPrefs.user);
  expect(userToAdd.prefId).toEqual(userPrefs._id);
});

test("TESTING: Password", () => {
  let password = "Sample--4$#4--Password";
  dummyUser = {
    username: "Pepe",
    email: "pepe@gmail.com",
    password: password,
  };

  let newUser = new User(dummyUser);
  newUser.setPassword(password);
  expect(newUser.validPassword(password)).toBeTrue;
  expect(newUser.password).toBeUndefined;
});
