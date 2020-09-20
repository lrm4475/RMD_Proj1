//set up server
const http = require('http');
const url = require('url');
const responseHandler = require('./responses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

//key:val obj
const urlStruct = {
  '/': responseHandler.getIndex,
  index: responseHandler.getIndex,
};

// handle HTTP requests. In node the HTTP server will automatically
// send this function request and pre-filled response objects.
const onRequest = (request, response) => {
  const parsedUrl = url.parse(request.url);
  // grab 'accept' headers (comma delimited) and split them into an array
  const acceptedTypes = request.headers.accept.split(',');
  // check if path name matches. If not default to index.
  if (urlStruct[parsedUrl.pathname]) {
    urlStruct[parsedUrl.pathname](request, response, acceptedTypes);
  } else {
    // otherwise send them to the index (normally this would be the 404 page)
    urlStruct.index(request, response, acceptedTypes);
  }
};

// start server
http.createServer(onRequest).listen(port);
console.log(`Listening on 127.0.0.1: ${port}`);