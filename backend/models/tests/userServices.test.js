/* -- Testing userServices */
const mongoose = require("mongoose");
const mockingoose = require("mockingoose");

const UserSchema = require("../user/userSchema");
const PrefSchema = require("../user/prefSchema");
const userServices = require("../user/userServices");
const { validate } = require("../user/prefSchema");

let userModel;
let prefModel;

beforeAll(async () => {
  userModel = mongoose.model("user", UserSchema.schema);
  prefModel = mongoose.model("pref", PrefSchema.schema);
});

afterAll(async () => {

});

beforeEach(async () => {
  jest.clearAllMocks();
  mockingoose.resetAll();
});

afterEach(async () => {

});

test("Succesful findUserbyId", async () => {
  const anyId = "624ddbd7f9bbb3ab16c362ee";

  let resultUser1 = {
    username: 'Jeff',
    email: 'j@mail',
    _id: new mongoose.ObjectId("624ddbd7f9bbb3ab16c362ee"),
    prefs: new mongoose.ObjectId("624ddbd7f9bbb3ab16c362ef"),
    salt: '6d473c07369d5bec999d91c8182afe43',
    hash: '998f340af637d182d4f7f11675f0a331d1a92cdb73841dc4aa4684c0845b228d55318e613dff2a9302d1e5525bc12e403123bf0c6b4dabe538e6d9e64e74c217'
  };  

  mockingoose(userModel).toReturn(resultUser1, 'findById');
  //mockingoose(userModel).toReturn(resultUser1, 'find');

  const user = await userServices.findUserById(anyId);
  console.log(user);
  expect(user._id).toBe(anyId);
});

test("Succesful findUserbyUsername", async () => {
  const username = "Jeff";

  let resultUser1 = {
    username: 'Jeff',
    email: 'j@mail',
    _id: new mongoose.ObjectId("624ddbd7f9bbb3ab16c362ee"),
    prefs: new mongoose.ObjectId("624ddbd7f9bbb3ab16c362ef"),
    salt: '6d473c07369d5bec999d91c8182afe43',
    hash: '998f340af637d182d4f7f11675f0a331d1a92cdb73841dc4aa4684c0845b228d55318e613dff2a9302d1e5525bc12e403123bf0c6b4dabe538e6d9e64e74c217'
  };  

  mockingoose(userModel).toReturn(resultUser1, 'find');

  const user = await userServices.findUserByUsername(username);
  expect(user.username).toBe(username);
});

test("Succesful findUserbyEmail", async () => {
  const email = "j@mail";

  let resultUser1 = {
    username: 'Jeff',
    email: 'j@mail',
    _id: new mongoose.ObjectId("624ddbd7f9bbb3ab16c362ee"),
    prefs: new mongoose.ObjectId("624ddbd7f9bbb3ab16c362ef"),
    salt: '6d473c07369d5bec999d91c8182afe43',
    hash: '998f340af637d182d4f7f11675f0a331d1a92cdb73841dc4aa4684c0845b228d55318e613dff2a9302d1e5525bc12e403123bf0c6b4dabe538e6d9e64e74c217'
  };  

  mockingoose(userModel).toReturn(resultUser1, 'find');

  const user = await userServices.findUserByEmail(email);
  expect(user.email).toBe(email);
});

test("sign up - successful", async () => {
  const user = {
    "username": "HarryPotter",
    "email": "youngWizard@gmail.com",
    "password": "Srr$pffle%%44*5"
  };

  let resultUser1 = {
    username: 'HarryPotter',
    email: 'youngWizard@gmail.com',
    _id: new mongoose.ObjectId("624ddbd7f9bbb3ab16c362ee"),
    prefs: new mongoose.ObjectId("624ddbd7f9bbb3ab16c362ef"),
    salt: '6d473c07369d5bec999d91c8182afe43',
    hash: '998f340af637d182d4f7f11675f0a331d1a92cdb73841dc4aa4684c0845b228d55318e613dff2a9302d1e5525bc12e403123bf0c6b4dabe538e6d9e64e74c217'
  };  
  
  mockingoose(prefModel).toReturn(resultUser1, 'save');
  mockingoose(userModel).toReturn(resultUser1, 'save');

  const result = await userServices.signUpUser(user);

  expect(result).toBeTruthy();
});

test("signup - failure path with invalid id", async () => {
  let user = {
    "_id":"123",
    "username": "HarryPotter",
    "email": "youngWizard@gmail.com",
    "password": "dderr$pffle%%44*5",
  };

  let resultUser1 = {
    username: 'HarryPotter',
    email: 'youngWizard@gmail.com',
    _id: new mongoose.ObjectId("624ddbd7f9bbb3ab16c362ee"),
    prefs: new mongoose.ObjectId("624ddbd7f9bbb3ab16c362ef"),
    salt: '6d473c07369d5bec999d91c8182afe43',
    hash: '998f340af637d182d4f7f11675f0a331d1a92cdb73841dc4aa4684c0845b228d55318e613dff2a9302d1e5525bc12e403123bf0c6b4dabe538e6d9e64e74c217'
  };  
  
  mockingoose(prefModel).toReturn(resultUser1, 'save');
  mockingoose(userModel).toReturn({}, 'save');

  const result = await userServices.signUpUser(user);

  expect(result).toBeFalsy();
});

test("validate -- success", async () => {
  const user = {
    "username": "Harry Potter",
    "email": "youngWizard@gmail.com",
    "password": "Sample%%44*5"
  };

  mockingoose(userModel).toReturn({}, 'find');
  mockingoose(userModel).toReturn({}, 'findById');

  expect(userServices.validateUserInfo(user)).toBeTruthy();
});

test("validate -- failure path with already taken id", async () => {
  const user = {
    "username": "Harry Potter",
    "email": "youngWizard@gmail.com",
    "password": "Sample%%44*5"
  };

  mockingoose(userModel).toReturn(user, 'find');
  expect(userServices.validateUserInfo(user)).resolves.toBeFalsy();
});

test("validate -- failure path with already taken username", async () => {
  const user = {
    "username": "Harry Potter",
    "email": "youngWizard@gmail.com",
    "password": "Sample%%44*5"
  };

  mockingoose(userModel).toReturn(user, 'find');
  expect(userServices.validateUserInfo(user)).resolves.toBeFalsy();
});

test("validate -- failure path with already taken email", async () => {
  const user = {
    "username": "Harry Potter",
    "email": "youngWizard@gmail.com",
    "password": "Sample%%44*5"
  };

  mockingoose(userModel).toReturn(user, 'find');
  expect(userServices.validateUserInfo(user)).resolves.toBeFalsy();
  });

// --- TESTS BELOW DONE ----

test("Adding user w/o validation -- failure path with no username", async () => {
  const user = {
    "email": "youngWizard@gmail.com",
    "password": "Sample%%44*5",
  }

  mockingoose(userModel).toReturn(false, 'save');
  const result = await userServices.signUpUser(user);
  expect(result).toBeFalsy();
});

test("Adding user w/o validation -- failure path with no email", async () => {
  const user = {
    "username": "Harry Potter",
    "password": "Sample%%44*5",
    };

  mockingoose(userModel).toReturn(false, 'save');

  const result = await userServices.signUpUser(user);
  expect(result).toBeFalsy();
});


test("Logging in user -- Success", async () => {
  const user = {
    "username": "Harry Potter",
    "email": "youngWizard@gmail.com",
    "password": "1",
  };

  let resultUser1 = {
    username:user.username,
    email: user.email,
    _id: new mongoose.Types.ObjectId("624ddbd7f9bbb3ab16c362ee"),
    prefs: new mongoose.Types.ObjectId("624ddbd7f9bbb3ab16c362ef"),
    salt: '0ab6e8e2c911609a81101f83b9044267',
    hash: '910ef94b7754121e6cd22da20c9f16d0f4778c07585c49b6ddab11c3fd60432260136e027ca6bb11e0bc85f1b97cd4fa7c812bf11f6124d7c56bac137594a067'
  }; 

  mockingoose(userModel).toReturn(resultUser1, 'save');
  mockingoose(userModel).toReturn([resultUser1], 'find');
  
  const result = await userServices.signUpUser(user);
  const loginResult = await userServices.login(user);

  expect(loginResult).toBeTruthy();
});

test("Logging in user -- Password Failure", async () => {
  const user = {
    "username": "Harry Potter",
    "email": "youngWizard@gmail.com",
    "password": "Sample%%44*5",
  };

  let resultUser1 = {
    username:user.username,
    email: user.email,
    _id: new mongoose.Types.ObjectId("624ddbd7f9bbb3ab16c362ee"),
    prefs: new mongoose.Types.ObjectId("624ddbd7f9bbb3ab16c362ef"),
    salt: '0ab6e8e2c911609a81101f83b9044267',
    hash: '910ef94b7754121e6cd22da20c9f16d0f4778c07585c49b6ddab11c3fd60432260136e027ca6bb11e0bc85f1b97cd4fa7c812bf11f6124d7c56bac137594a067'
  }; 

  mockingoose(userModel).toReturn(resultUser1, 'save');
  mockingoose(userModel).toReturn(false, 'find');

  const result = await userServices.signUpUser(user);
  user.password = "Differentpass55$";

  const loginResult = await userServices.login(user);

  expect(loginResult).toBeFalsy();
});

test("Logging in user -- Username Failure", async () => {
  const user = {
    "username": "Harry Potter",
    "email": "youngWizard@gmail.com",
    "password": "Sample%%44*5",
  };

  let resultUser1 = {
    username:user.username,
    email: user.email,
    _id: new mongoose.Types.ObjectId("624ddbd7f9bbb3ab16c362ee"),
    prefs: new mongoose.Types.ObjectId("624ddbd7f9bbb3ab16c362ef"),
    salt: '0ab6e8e2c911609a81101f83b9044267',
    hash: '910ef94b7754121e6cd22da20c9f16d0f4778c07585c49b6ddab11c3fd60432260136e027ca6bb11e0bc85f1b97cd4fa7c812bf11f6124d7c56bac137594a067'
  }; 

  mockingoose(userModel).toReturn(resultUser1, 'save');
  mockingoose(userModel).toReturn(false, 'find');

  const result = await userServices.signUpUser(user);
  user.username = "Ron";

  const loginResult = await userServices.login(user);

  expect(loginResult).toBeFalsy();
});

test("Logging in user -- no username Failure", async () => {
  const user = {
    "email": "youngWizard@gmail.com",
    "password": "Sample%%44*5",
  };
  let resultUser1 = {
    email: user.email,
    _id: new mongoose.Types.ObjectId("624ddbd7f9bbb3ab16c362ee"),
    prefs: new mongoose.Types.ObjectId("624ddbd7f9bbb3ab16c362ef"),
    salt: '0ab6e8e2c911609a81101f83b9044267',
    hash: '910ef94b7754121e6cd22da20c9f16d0f4778c07585c49b6ddab11c3fd60432260136e027ca6bb11e0bc85f1b97cd4fa7c812bf11f6124d7c56bac137594a067'
  }; 
  mockingoose(userModel).toReturn(resultUser1, 'save');
  mockingoose(userModel).toReturn(false, 'find');

  const result = await userServices.signUpUser(user);
  const loginResult = await userServices.login(user);

  expect(loginResult).toBeFalsy();
});

test("Logging in user -- no email Failure", async () => {
  const user = {
    "username": "Harry Potter",
    "password": "Sample%%44*5",
  };
  let resultUser1 = {
    username: user.username,
    email: undefined,
    _id: new mongoose.Types.ObjectId("624ddbd7f9bbb3ab16c362ee"),
    prefs: new mongoose.Types.ObjectId("624ddbd7f9bbb3ab16c362ef"),
    salt: '0ab6e8e2c911609a81101f83b9044267',
    hash: '910ef94b7754121e6cd22da20c9f16d0f4778c07585c49b6ddab11c3fd60432260136e027ca6bb11e0bc85f1b97cd4fa7c812bf11f6124d7c56bac137594a067'
  }; 
  mockingoose(userModel).toReturn(resultUser1, 'save');
  mockingoose(userModel).toReturn(false, 'find');

  const result = await userServices.signUpUser(user);
  const loginResult = await userServices.login(user);

  expect(loginResult).toBeFalsy();
});

test("Adding user w/o validation -- successful path", async () => {
  const user = {
    "username": "Harry Potter",
    "email": "youngWizard@gmail.com",
    "password": "Sample%%44*5",
  };
  let resultUser1 = {
    username: user.username,
    email: user.email,
    _id: new mongoose.Types.ObjectId("624ddbd7f9bbb3ab16c362ee"),
    prefs: new mongoose.Types.ObjectId("624ddbd7f9bbb3ab16c362ef"),
    salt: '0ab6e8e2c911609a81101f83b9044267',
    hash: '910ef94b7754121e6cd22da20c9f16d0f4778c07585c49b6ddab11c3fd60432260136e027ca6bb11e0bc85f1b97cd4fa7c812bf11f6124d7c56bac137594a067'
  }; 
  mockingoose(userModel).toReturn(resultUser1, 'save');
  const result = await userServices.signUpUser(user);

  expect(result).toBeTruthy();
  expect(result.username).toBe(user.username);
  expect(result.email).toBe(user.email);
  expect(result.validPassword("1")).toBeTruthy();
  expect(result).toHaveProperty("_id");
});

test("Adding user w/o validation -- failure path with invalid id", async () => {
  const user = {
    "_id": "123",
    "username": "Harry Potter",
    "email": "youngWizard@gmail.com",
    "password": "Sample%%44*5",
  };
  mockingoose(userModel).toReturn(false, 'save');
  const result = await userServices.signUpUser(user);

  expect(result).toBeFalsy();
});

test("Adding user w/o validation -- failure path with already taken id", async () => {
  const user = {
    "username": "Harry Potter",
    "email": "youngWizard@gmail.com",
    "password": "Sample%%44*5",
  };
  let resultUser1 = {
    username: user.username,
    email: user.email,
    _id: new mongoose.Types.ObjectId("624ddbd7f9bbb3ab16c362ee"),
    prefs: new mongoose.Types.ObjectId("624ddbd7f9bbb3ab16c362ef"),
    salt: '6d473c07369d5bec999d91c8182afe43',
    hash: '998f340af637d182d4f7f11675f0a331d1a92cdb73841dc4aa4684c0845b228d55318e613dff2a9302d1e5525bc12e403123bf0c6b4dabe538e6d9e64e74c217'
  };  

  mockingoose(userModel).toReturn(resultUser1, 'save');

  const anotherUser = {
    "username": "Ron",
    "email": "youngWizard2@gmail.com",
    "password": "Sample%%44*5",
    "_id": resultUser1._id
  } 
  mockingoose(userModel).toReturn({}, 'save');
  mockingoose(prefModel).toReturn({}, 'save');

  const result = await userServices.signUpUser(anotherUser);
  expect(result).toMatchObject({});
});


test("Adding user  w/o validation -- success path with already taken username", async () => {
  const user = {
    "username": "Harry Potter",
    "email": "youngWizard@gmail.com",
    "password": "Sample%%44*5",
  };
  let resultUser1 = {
    username: user.username,
    email: user.email,
    _id: new mongoose.Types.ObjectId("624ddbd7f9bbb3ab16c362ee"),
    prefs: new mongoose.Types.ObjectId("624ddbd7f9bbb3ab16c362ef"),
    salt: '6d473c07369d5bec999d91c8182afe43',
    hash: '998f340af637d182d4f7f11675f0a331d1a92cdb73841dc4aa4684c0845b228d55318e613dff2a9302d1e5525bc12e403123bf0c6b4dabe538e6d9e64e74c217'
  };  

  mockingoose(userModel).toReturn(resultUser1, 'save');
  const addedUser = await userServices.signUpUser(user);

  const anotherUser = {
    "username": "Ron",
    "email": "youngWizard2",
    "password": "Sample%%44*5"
  }

  const resultUser2 = {
    "username": addedUser.username,
    "email": anotherUser.email,
    "salt":"4851f9d5d78683c72ceff482545bc17d",
    "hash":"8007c506749c89aab137fd2d64defa4139a96ade44834c8ac8d5b34e4e6d8d1662b6b2058e36244c16f204f6267815fb08dbcfdee3fcfae2c419b9bd5fd6417e"
  };
  mockingoose(userModel).toReturn(resultUser2, 'save');
  const result = await userServices.signUpUser(anotherUser);
  expect(result).toBeTruthy();
});

test("Adding user w/o validation -- success path with already taken email", async () => {
  const user = {
    "username": "Harry Potter",
    "email": "youngWizard@gmail.com",
    "password": "Sample%%44*5",
  };
  let resultUser1 = {
    username: 'HarryPotter',
    email: 'youngWizard@gmail.com',
    _id: new mongoose.Types.ObjectId("624ddbd7f9bbb3ab16c362ee"),
    prefs: new mongoose.Types.ObjectId("624ddbd7f9bbb3ab16c362ef"),
    salt: '6d473c07369d5bec999d91c8182afe43',
    hash: '998f340af637d182d4f7f11675f0a331d1a92cdb73841dc4aa4684c0845b228d55318e613dff2a9302d1e5525bc12e403123bf0c6b4dabe538e6d9e64e74c217'
  };  

  mockingoose(userModel).toReturn(resultUser1, 'save');
  const addedUser = await userServices.signUpUser(user);

  const anotherUser = {
    "username": "Ron",
    "email": addedUser.email,
    "password": "Sample%%44*5"
  }

  const resultUser2 = {
    "username": "Ron",
    "email": addedUser.email,
    "salt":"4851f9d5d78683c72ceff482545bc17d",
    "hash":"8007c506749c89aab137fd2d64defa4139a96ade44834c8ac8d5b34e4e6d8d1662b6b2058e36244c16f204f6267815fb08dbcfdee3fcfae2c419b9bd5fd6417e"
  };
  mockingoose(userModel).toReturn(resultUser2, 'save');

  const result = await userServices.signUpUser(anotherUser);
  expect(result).toBeTruthy();
});


test("Adding user w/o validation -- failure path with no username", async () => {
  const user = {
    "email": "youngWizard@gmail.com",
    "password": "Sample%%44*5",
  }

  let resultUser = {
    username: 'HarryPotter',
    email: 'youngWizard@gmail.com',
    _id: new mongoose.Types.ObjectId("624ddbd7f9bbb3ab16c362ee"),
    prefs: new mongoose.Types.ObjectId("624ddbd7f9bbb3ab16c362ef"),
    salt: '6d473c07369d5bec999d91c8182afe43',
    hash: '998f340af637d182d4f7f11675f0a331d1a92cdb73841dc4aa4684c0845b228d55318e613dff2a9302d1e5525bc12e403123bf0c6b4dabe538e6d9e64e74c217'
  };  
  mockingoose(userModel).toReturn(resultUser, 'save');

  const result = await userServices.signUpUser(user);
  expect(result).toBeFalsy();
});

test("Adding user w/o validation -- failure path with no email", async () => {
  const user = {
    "username": "Harry Potter",
    "password": "Sample%%44*5",
    };

  let resultUser = {
      username: 'HarryPotter',
      email: 'youngWizard@gmail.com',
      _id: new mongoose.Types.ObjectId("624ddbd7f9bbb3ab16c362ee"),
      prefs: new mongoose.Types.ObjectId("624ddbd7f9bbb3ab16c362ef"),
      salt: '6d473c07369d5bec999d91c8182afe43',
      hash: '998f340af637d182d4f7f11675f0a331d1a92cdb73841dc4aa4684c0845b228d55318e613dff2a9302d1e5525bc12e403123bf0c6b4dabe538e6d9e64e74c217'
    };  
    mockingoose(userModel).toReturn(resultUser, 'save');

  const result = await userServices.signUpUser(user);
  expect(result).toBeFalsy();
});