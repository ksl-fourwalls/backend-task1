// Docs on event and context https://docs.netlify.com/functions/build/#code-your-function-2
const fetch = require('node-fetch')
const { MongoClient } = require("mongodb");

const mongoClient = new MongoClient("mongodb+srv://kushalpbd:hh41T9zdebUrURVx@cluster0.tgez674.mongodb.net/?retryWrites=true&w=majority");
const clientPromise = mongoClient.connect();



const handler = async (event) => {

    const { email, password, question} = JSON.parse(event.body);
    if (!email) return { statusCode: 400, body: 'email missing' }
    if (!password) return { statusCode: 400, body: 'password missing' }
    if (!question) return { statusCode: 400, body: 'question' }

  try {
        const database = (await clientPromise).db("mydb");
        const collection = database.collection("catquestion");
        // Function logic here ...
        const results = await collection.insertOne({"email": email, "question": question);
        return {
            statusCode: 200,
            body: JSON.stringify(results),
        }

    } catch (error) {
        return { statusCode: 500, body: error.toString() }
    }

/*
  try {
    const subject = event.queryStringParameters.name || 'World'
    return {
      statusCode: 200,
      body: JSON.stringify({ message: `Hello ${subject}` }),
      // // more keys you can return:
      // headers: { "headerName": "headerValue", ... },
      // isBase64Encoded: true,
    }
  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
  */
}

module.exports = { handler }
