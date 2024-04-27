const express = require('express');
const cors = require('cors');
const connectToDB = require('./connection');

const app = express();
const port = 8000;

app.use(express.json());
app.use(cors());

app.use('/users', require('./routers/userRoutes'));


connectToDB();

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});