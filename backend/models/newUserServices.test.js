
/* -- Testing User Schema */
// Importing User Schema 
const User = require('./UserServices');

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
  let pref = {
    "NBA": [],
    "NHL":["5"]
  }
  newEncrptUser.pref = pref;
  expect(pref).toBe(newEncrptUser.pref);
});


test('TESTING: Password', () => {
  let newEncrptUser = new User();
  let password = "Sample--4$#4--Password";
  newEncrptUser.setPassword(password);

  expect(newEncrptUser.validPassword(password)).toBeTrue;
});






