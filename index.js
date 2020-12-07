require('express-async-errors');
const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');

const app = express();
dotenv.config();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use((req, res) => {
  res.status(404).send('Not Found');
});

app.listen(process.env.PRESENCE_SERVICE_PORT, () => {
  console.log(`Server is running on port ${process.env.PRESENCE_SERVICE_PORT}`);
});
