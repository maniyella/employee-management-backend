const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');
require('dotenv').config();
const dns = require("dns");
dns.setServers(["1.1.1.1", "8.8.8.8"]);

const app = express();

const client = new MongoClient(process.env.MONGO_URI);
async function connectDB() {
  try {
    await client.connect();
    db = client.db(process.env.DB_NAME);
    console.log("MongoDB Atlas connected");
  } catch (err) {
    console.log("Error:", err);
  }
}

connectDB();

app.use(cors());
app.use(express.json());

const employeeRoutes = require("./routes/employee.routes")
console.group("before route")
app.use('/getemployees', employeeRoutes)
app.use('/addemployee', employeeRoutes)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});