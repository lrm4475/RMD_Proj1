// will get cleared by Heroku every so often
const users = {};

// respond function
const respondJSON = (request, response, status, object) => {
  // object for our headers
  // Content-Type for json
  const headers = {
    'Content-Type': 'application/json',
  };

  // send response with json object
  response.writeHead(status, headers);
  response.write(JSON.stringify(object));
  response.end();
};
// function to respond without json body
const respondJSONMeta = (request, response, status) => {
  // object for our headers
  // Content-Type for json
  const headers = {
    'Content-Type': 'application/json',
  };

  // send response without json object, just headers
  response.writeHead(status, headers);
  response.end();
};

// should calculate a 200
const getUsers = (request, response) => {
  // json object to send
  const responseJSON = {
    users,
  };
  // return 200 with message
  return respondJSON(request, response, 200, responseJSON);
};
// get meta info about user object
const getUsersMeta = (request, response) => {
  // return 200 without message, just the meta data
  respondJSONMeta(request, response, 200);
};

// function to add a user from a POST body
const addUser = (request, response, body) => {
  // default json message
  const responseJSON = {
    message: 'Name and age are both required.',
  };

  // check to make sure we have both fields
  // if not, 400 badRequest
  if (!body.name || !body.age) {
    responseJSON.id = 'missingParams';
    return respondJSON(request, response, 400, responseJSON);
  }
  // 201 created
  let responseCode = 201;

  // if name already exists
  if (users[body.name]) {
    responseCode = 204;
  } else {
    users[body.name] = {};
  }

  // add/update fields
  users[body.name].name = body.name;
  users[body.name].age = body.age;

  if (responseCode === 201) {
    responseJSON.message = 'Created Successfully';
    return respondJSON(request, response, responseCode, responseJSON);
  }
  // 204 has an empty payload, just a success
  return respondJSONMeta(request, response, responseCode);
};

const updateUser = (request, response) => {
  // change to make to user
  // This is just a dummy object for example
  const newUser = {
    createdAt: Date.now(),
  };

  users[newUser.createdAt] = newUser;

  // return a 201 created status
  return respondJSON(request, response, 201, newUser);
};

// function for 404 not found requests with message
const notFound = (request, response) => {
  // create error message for response
  const responseJSON = {
    message: 'The page you are looking for was not found.',
    id: 'notFound',
  };

  // return a 404 with an error message
  respondJSON(request, response, 404, responseJSON);
};
// function for 404 not found without message
const notFoundMeta = (request, response) => {
  // return a 404 without an error message
  respondJSONMeta(request, response, 404);
};

module.exports = {
  getUsers,
  getUsersMeta,
  addUser,
  updateUser,
  notFound,
  notFoundMeta,
};
