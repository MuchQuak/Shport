
/* -- Testing User Schema */
// Importing User Schema 
const User = require('./userSchema');

test('TESTING: Username', () => {
  let newEncrptUser = new User();
  let username = "Bob";
  newEncrptUser.username = username,
  expect(username).toBe(newEncrptUser.username);
});

test('TESTING: Email', () => {
  let newEncrptUser = new User();
  let email = "bob@gmail.com";
  newEncrptUser.email = email;
  expect(email).toBe(newEncrptUser.email);
});

test('TESTING: Pref', () => {
  let newEncrptUser = new User();
  let prefs = {
    sports: {
      "NBA": [],
      "NHL":["5"]
    }
  }
  newEncrptUser.prefs = prefs;
  expect(prefs).toBe(newEncrptUser.prefs);
});


test('TESTING: Password', () => {
  let newEncrptUser = new User();
  let password = "Sample--4$#4--Password";
  newEncrptUser.setPassword(password);

  expect(newEncrptUser.validPassword(password)).toBeTrue;
});






