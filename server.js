const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');
require('dotenv').config();
const dns = require("dns");
dns.setServers(["1.1.1.1", "8.8.8.8"]);

console.log("=== SERVER STARTING - WAITING FOR MONGODB ===");

const app = express();

let db;
const client = new MongoClient(process.env.MONGO_URI);
async function connectDB() {
  try {
    await client.connect();
    db = client.db(process.env.DB_NAME);
    console.log("process.env",process.env)
    console.log("process.env DB_NAME",process.env.DB_NAME)
    console.log("MongoDB Atlas connected");
  } catch (err) {
    console.error("Error:", err);
    throw err;
  }
}

app.use(cors());
app.use(express.json());

const employeeRoutes = require("./routes/employee.routes")
console.group("before route")
app.use('/getemployees', employeeRoutes)
app.use('/addemployee', employeeRoutes)

console.log("before backend")
app.get('/', (req, res) => {
  res.send('Backend running 🚀');
}); 

console.log("process.env.PORT", process.env.PORT)

const PORT = process.env.PORT || 8080;

// Start server AFTER MongoDB connects
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}).catch(err => {
  console.error("Failed to connect to MongoDB:", err);
  process.exit(1);
});

module.exports = { db };