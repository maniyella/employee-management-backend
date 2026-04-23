const server = require('../server');

exports.getAllEmployees =  async (req, res) => {
    console.log("In fun")
    try {
        console.log("try block")
        const db = server.db;
        const data = await db.collection('employees').find().toArray();
        console.log("data", data)
        res.json(data);
    } catch (err) {
        console.log("catch")
        res.status(500).json(err);
    }
};

exports.addEmployee = async (req, res) => {
    try {
        console.log("addEmployee body", req.body);
        const db = server.db;
        const result = await db.collection('employees').insertOne(req.body);
        res.json({
            message: "Employee inserted",
            insertedId: result.insertedId
        });
    } catch (err) {
    res.status(500).json(err);
  }
}