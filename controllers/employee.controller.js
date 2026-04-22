exports.getAllEmployees =  async (req, res) => {
    try {
        const data = await db.collection('employees').find().toArray();
        res.json(data);
    } catch (err) {
        res.status(500).json(err);
    }
};

exports.addEmployee = async (req, res) => {
    try {
        const result = await db.collection('employees').insertOne(req.body);
        res.json({
            message: "Employee inserted",
            insertedId: result.insertedId
        });
    } catch (err) {
    res.status(500).json(err);
  }
}