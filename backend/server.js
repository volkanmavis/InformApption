const express = require('express');
const cors = require('cors');
const connectToDB = require('./connection');
require('dotenv').config()

const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());
app.use(cors({
    origin: ["http://localhost:8000", "https://informapption-1.onrender.com"]
}));

app.use('/users', require('./routers/userRoutes'));
app.use('/questions', require('./routers/questionRoutes'));

app.get('/', (req, res) => {
  res.send('Hello World!')
})


connectToDB();

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});