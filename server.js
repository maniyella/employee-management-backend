const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');
require('dotenv').config();
const dns = require("dns");
dns.setServers(["1.1.1.1", "8.8.8.8"]);

const app = express();

app.use(cors());
app.use(express.json());

const client = new MongoClient(process.env.MONGO_URI);
const { setDb } = require('./db');
async function connectDB() {
  try {
    await client.connect();
    const database = client.db(process.env.DB_NAME);
    setDb(database);
    console.log("MongoDB Atlas connected");
  } catch (err) {
    console.error("Error:", err);
    throw err;
  }
}


console.log("before backend")
app.get('/', (req, res) => {
  res.send('Backend running 🚀');
});

const employeeRoutes = require("./routes/employee.routes")
app.use('/employees', employeeRoutes)

const PORT = process.env.PORT || 3000;

// Start server AFTER MongoDB connects
(async () => {
  try {
    await connectDB();
    app.listen(PORT, "0.0.0.0" , () => {
      console.log(`Server running on ${PORT}`);
    });
  } catch (err) {
    console.error("Failed to connect to MongoDB:", err);
    process.exit(1);
  }
})();