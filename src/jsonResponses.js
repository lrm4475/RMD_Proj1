// will get cleared by Heroku every so often
const users = {};

// respond function (get)
const respondJSON = (request, response, status, object) => {
  const headers = {
    'Content-Type': 'application/json',
  };
  // send response w/ json obj
  response.writeHead(status, headers);
  response.write(JSON.stringify(object));
  response.end();
};
// respond function (head)
const respondJSONMeta = (request, response, status) => {
  const headers = {
    'Content-Type': 'application/json',
  };
  // send response w/o json object, just headers
  response.writeHead(status, headers);
  response.end();
};

// get saved locations - should calculate success - 200
const getLocations = (request, response) => {
  // obj to send to response funct
  const responseJSON = {
    users,
  };
  return respondJSON(request, response, 200, responseJSON);
};
const getLocationsMeta = (request, response) => {
  // return 200 w/o message, just meta data
  respondJSONMeta(request, response, 200);
};

// add user from POST body
const addLocation = (request, response, body) => {
  // check to make sure we have both fieldsq1
  const responseJSON = {
    // default json msg
    message: 'Oops! All fields are required. Please try again.',
  };
  // if not, 400 - badRequest
  if (!body.name || !body.city) {
    responseJSON.id = 'missingParams';
    return respondJSON(request, response, 400, responseJSON);
  }

  // 201 - created
  let responseCode = 201;

  // if name already exists
  if (users[body.name]) {
    responseCode = 204;
  } else {
    users[body.name] = {};
    users[body.name].locations = [];
  }
  // add/update fields
  users[body.name].locations.push(`City: ${body.city}`);
  // users[body.name].locations.push("State: " + body.state);

  if (responseCode === 201) {
    responseJSON.message = 'User created Successfully';
    return respondJSON(request, response, responseCode, responseJSON);
  }
  // 204 - empty payload, just a success
  return respondJSONMeta(request, response, responseCode);
};

const updateLocation = (request, response) => {
  const newUser = {
    createdAt: Date.now(),
  };

  // change to make
  users[newLocation.createdAt] = newUser;

  // return 201 - created
  return respondJSON(request, response, 201, newUser);
};

// 404 - notFound
const notFound = (request, response) => {
  // error msg and id
  const responseJSON = {
    message: 'The page you are looking for was not found.',
    id: 'notFound',
  };
  // return 404 w/error msg
  respondJSON(request, response, 404, responseJSON);
};
// 404 - notFound (head)
const notFoundMeta = (request, response) => {
  respondJSONMeta(request, response, 404);
};

module.exports = {
  getLocations,
  getLocationsMeta,
  addLocation,
  updateLocation,
  notFound,
  notFoundMeta,
};
