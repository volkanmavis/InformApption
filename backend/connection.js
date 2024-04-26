const mongoose = require('mongoose');

const URI = "mongodb+srv://volkanmav:AK8F3Fe95iBpUJ3I@cluster0.cvpl35d.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

async function connectToDB() {
    try {
        await mongoose.connect(URI);
        console.log("Connected to DB");
    } catch (err) {
        console.error("Error connecting to DB:", err);
    }
}

module.exports = connectToDB;