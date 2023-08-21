// api.js

exports.handler = async (event, context) => {
  if (event.httpMethod === 'GET') {
    try {
      // Process the GET request as needed
      const data = require('./db.json');

      // Return the data as the response
      return {
        statusCode: 200,
        body: JSON.stringify(data),
      };
    } catch (error) {
      // Return an error response if there was an issue processing the request
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Failed to process GET request' }),
      };
    }
  }
};

/*
// api.js

exports.handler = async (event, context) => {
  if (event.httpMethod === 'POST') {
    try {
      // Parse the incoming JSON payload from the request body
      const requestBody = JSON.parse(event.body);

      // Save the data to a database or perform other necessary operations
      // ...

      // Return a success response
      return {
        statusCode: 200,
        body: JSON.stringify({ message: 'POST request processed successfully' }),
      };
    } catch (error) {
      // Return an error response if there was an issue processing the request
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Failed to process POST request' }),
      };
    }
  }
};

*/

