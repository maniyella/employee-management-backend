exports.getAllEmployees = (req, res) => {
    console.log("data fetched successfully")
    res.json({ message: "Data fetched successfully" });
};

exports.addEmployee = (req, res) => {
    console.log(req.body)
    res.json({message : "Employee added successfully" });
}