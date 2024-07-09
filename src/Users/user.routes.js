import { Router } from 'express'
import { userController } from './user.controller.js'
import { validateToken, validateAdmin } from '../auth/jwt.auth.js'

const router = Router()

router.get('/', userController.getAll)
router.get('/:email', userController.getOneByEmail)
// router.post('/', userController.create)
router.put('/', userController.update)
router.delete('/:email', userController.remove)

router.post('/register', userController.register)
router.post('/register/image', userController.registerImage)
router.post('/login', userController.login)

router.put('/check', userController.updateStatus)

export default router
