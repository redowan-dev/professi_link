import express from 'express'
import { createJobController, getAllJobsController,updateJobController ,getJobDetailsController } from './jobs.controller.js'

export const jobRoutes = express.Router()

jobRoutes.route('/')
.get(getAllJobsController)
.post(createJobController)
jobRoutes.route('/:id')
.get(getJobDetailsController)
.patch(updateJobController)
// .patch(updateUserByIdController)