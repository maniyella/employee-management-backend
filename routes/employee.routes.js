const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employee.controller')
// CRUD Routes
console.log("In ROUTER file")
router.get('/', employeeController.getAllEmployees);
router.post('/', employeeController.addEmployee);

module.exports = router;