const express = require('express')

const router = express.Router()
const {
  createJob,
  deleteJob,
  getAllJobs,
  updateJob,
  getJob,
  getStats,
} = require('../controllers/jobs')
const testUser = require('../middleware/testuser')

// router.route('/').post(testUser, createJob).get(getAllJobs)
router.post('/', testUser, createJob)
router.get('/', testUser, getAllJobs)
router.get("/stats", getStats)

// router.route('/:id').get(getJob).delete(testUser, deleteJob).patch(updateJob)
router.get('/:id', testUser, getJob)
router.delete('/:id', testUser, deleteJob)
router.patch('/:id', testUser, updateJob)

module.exports = router
