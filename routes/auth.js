import { Router } from 'express'
import { login, register, infoUser, refreshToken, logout} from '../controllers/AuthController.js'
import { requireToken } from '../middlewares/RequireToken.js'
import { requireRefreshToken } from '../middlewares/RequireRefreshToken.js'
import { bodyLoginValidator, bodyRegisterValidator } from '../middlewares/ValidatorManager.js'

const router = Router()

router.post('/register', 
bodyRegisterValidator,
register)

router.post('/login',  
bodyLoginValidator,
login)

router.get('/protected', requireToken, infoUser)
router.get('/refresh', requireRefreshToken, refreshToken)
router.get('/logout', logout)

export default router