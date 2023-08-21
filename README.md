# backend-task1

### this site only allows you post request

### post data this way
> C:\Users\Kushal\Desktop\backend1>curl -X POST https://main--brilliant-muffin-c0b6bb.netlify.app/.netlify/functions/create-user

### below code insert data into database for create-user page
```javascript
          // Function logic here ...
          const results = await collection.insertOne({"email": email, "password": password, "fullname": fullName});
          return {
              statusCode: 200,
              body: JSON.stringify(results),
          }
```
