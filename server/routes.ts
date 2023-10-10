import { Router } from 'express'
import authRoutes from './src/controller/auth.controller'
const router = Router()

router.use('/auth', authRoutes)

export default router
