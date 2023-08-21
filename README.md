# backend-task1

### this site only allows you post request


### below code insert data into database for create-user page
```javascript
          // Function logic here ...
          const results = await collection.insertOne({"email": email, "password": password, "fullname": fullName});
          return {
              statusCode: 200,
              body: JSON.stringify(results),
          }
```