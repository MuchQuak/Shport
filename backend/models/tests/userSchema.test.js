/* -- Testing userSchema */
const User = require('../userSchema');

test('TESTING: Entire User Schema', () => {

  let username = "Pepe";
  let email = "pepe@gmail.com";
  let password = "Sample--4$#4--Password";
  let prefs = {"sports":{}};

  dummyUser = {
    "username": username,
    "email":email,
    "password":password,
    "prefs": prefs
  };


  let newUser = new User(dummyUser);

  expect(username).toBe(newUser.username);
  expect(email).toBe(newUser.email);

});



test('TESTING: Pref', () => {
  let prefs = {"sports":{}};

  dummyUser = {
    "username": "Pepe",
    "email":"pepe@gmail.com",
    "password": "Sample--4$#4--Password",
    "prefs": prefs
  };

  const newUser = new User(dummyUser);

  expect(prefs.sports).toEqual(newUser.prefs.sports);
});


test('TESTING: Password', () => {
  let password = "Sample--4$#4--Password";
  dummyUser = {
    "username": "Pepe",
    "email":"pepe@gmail.com",
    "password": password,
    "prefs": {"sports":{}}
  };

  let newUser = new User(dummyUser);
  newUser.setPassword(password);

  expect(newUser.validPassword(password)).toBeTrue;
  expect(newUser.password).toBeUndefined;
});






