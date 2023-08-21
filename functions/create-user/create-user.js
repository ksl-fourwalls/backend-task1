const fetch = require('node-fetch')
const { MongoClient } = require("mongodb");

const mongoClient = new MongoClient("mongodb+srv://kushalpbd:hh41T9zdebUrURVx@cluster0.tgez674.mongodb.net/?retryWrites=true&w=majority");
const clientPromise = mongoClient.connect();


const handler = async (event, context) => {
  if (event.httpMethod !== 'POST') return { statusCode: 400, body: 'Must POST to this function' }


try {
        const database = (await clientPromise).db("mydb");
        const collection = database.collection("catmouse");
        // Function logic here ...
        const results = await collection.find({}).limit(10).toArray();
        return {
            statusCode: 200,
            body: JSON.stringify(results),
        }

    } catch (error) {
        return { statusCode: 500, body: error.toString() }
    }

    // send account information along with the POST
    const { email, full_name: fullName, password } = JSON.parse(event.body)
    if (!email) return { statusCode: 400, body: 'email missing' }
    if (!password) return { statusCode: 400, body: 'password missing' }
    if (!fullName) return { statusCode: 400, body: 'full_name missing' }

    // identity.token is a short lived admin token which
    // is provided to all Netlify Functions to interact
    // with the Identity API
    const { identity } = context.clientContext

    await fetch(`${identity.url}/admin/users`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${identity.token}` },
      body: JSON.stringify({
        email,
        password,
        confirm: true,
        user_metadata: {
          full_name: fullName,
        },
      }),
    })

  return {
    statusCode: 200,
    body: 'success!',
  }
}

module.exports = { handler }
