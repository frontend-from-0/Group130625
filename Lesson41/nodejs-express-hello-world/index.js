const express = require('express');

const app = express()
const port = 5001

app.use(express.json())

app.get('/greet', (req, res) => {
  res.send('Hello World!')
})

app.post('/users', (req, res) => {
  /*
  To be able to retrive request body we need:
  1.  to call `app.use(express.json())` before defining routes. 
  2. Provide Content-Type: application/json header when calling the endpoint
  */
  console.log(req.body); 

  res.send({"username":"john"});
});

app.get('/ping', (req, res) => {
  res.send('pong')
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
