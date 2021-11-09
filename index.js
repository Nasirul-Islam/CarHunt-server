const express = require('express');
var cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000

app.use(cors());
app.use(express.json());

// username: process.env.DB_USER
// password: process.env.DB_PASS


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Running server at http://localhost:${port}`)
})