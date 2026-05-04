const { getDb } = require('../db');
const { ObjectId } = require('mongodb');

exports.getAllEmployees =  async (req, res) => {
    const db = getDb();
    try {
        const data = await db.collection('employees').find().toArray();
        res.json(data);
    } catch (err) {
        res.status(500).json(err);
    }
};

exports.addEmployee = async (req, res) => {
    const db = getDb();
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

exports.updateEmployee = async (req, res) => {
    const db = getDb();
    const id = req.params.id;
    if (!ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Invalid ID' });
    }
    try {
        const result = await db.collection('employees').updateOne(
            { _id: new ObjectId(id) },
            { $set: req.body }
        );
        res.json({
            message: "Employee Updated",
            updatedId: result.modifiedCount
        });
    } catch (err) {
         res.status(500).json(err);
    }
}

exports.deleteEmployee = async (req, res) => {
    const db = getDb();
    const id = req.params.id;
    try {
        const id = req.params.id;

        // validate id
        if (!ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid ID' });
        }

        const result = await db.collection('employees').deleteOne(
            { _id: new ObjectId(id) }
        );

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        res.json({ message: 'Employee deleted successfully' });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
}