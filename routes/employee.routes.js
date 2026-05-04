const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employee.controller')
// CRUD Routes
router.get('/', employeeController.getAllEmployees);
router.post('/', employeeController.addEmployee);
router.post('/:id', employeeController.updateEmployee);
router.delete('/:id', employeeController.deleteEmployee);

module.exports = router;