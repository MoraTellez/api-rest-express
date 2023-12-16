import { Router } from 'express'
import { login, register, infoUser, refreshToken, logout} from '../controllers/AuthController.js'
import { body } from 'express-validator'
import { ValidationResultExpress } from '../middlewares/ValidationResult.js'
import { requireToken } from '../middlewares/RequireToken.js'

const router = Router()

router.post('/register', [
  body('email', 'Email inválido').trim().isEmail().normalizeEmail(),
  body('password', 'Password inválido').isLength({min: 6}),
  body('repassword', 'Contraseñas no coinciden').custom((value, {req}) => {
    return value === req.body.password
  })
], 
ValidationResultExpress,
register)

router.post('/login',  [
  body('email', 'Email inválido').trim().isEmail().normalizeEmail(),
  body('password', 'Password inválido').isLength({min: 6})
],
ValidationResultExpress,
login)

router.get('/protected', requireToken, infoUser)
router.get('/refresh', refreshToken)
router.get('/logout', logout)

export default router