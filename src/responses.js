const fs = require('fs');
const index = fs.readFileSync(`${__dirname}/../client/client.html`);

//fill in response to send back
const respond = (request, response, content, type) => {
  // set status code (200 success) and content type
  response.writeHead(200, { 'Content-Type': type });
  // write the content string or buffer to response
  response.write(content);
  // send the response to the client
  response.end();
};

// function to handle the index page
const getIndex = (request, response) => {
  respond(request, response, index, 'text/html');
};

module.exports = {
  getIndex,
};