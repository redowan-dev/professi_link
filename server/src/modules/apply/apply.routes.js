import express from 'express'
import { createApplyController, getAllApplysController, getApplyDetailsController } from './apply.controller.js'


export const ApplyRoutes = express.Router()

ApplyRoutes.route('/')
.get(getAllApplysController)
.post(createApplyController)
ApplyRoutes.route('/:id')
.get(getApplyDetailsController)
// .patch(updateUserByIdController)