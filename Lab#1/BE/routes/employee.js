const express = require('express')
const router = express.Router()

const {
  createEmployee,
  deleteEmployee,
  getEmployees,
} = require('../controllers/employee')

router.route('/').get(getEmployees).post(createEmployee).de

router.route('/:id').delete(deleteEmployee)

module.exports = router
