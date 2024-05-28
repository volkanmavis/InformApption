const express = require('express');
const cors = require('cors');
const connectToDB = require('./connection');
require('dotenv').config()

const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());
app.use(cors());

app.use('/users', require('./routers/userRoutes'));
app.use('/questions', require('./routers/questionRoutes'));


connectToDB();

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});