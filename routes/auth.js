import { Router } from 'express'
import { login, register} from '../controllers/AuthController.js'
import { body } from 'express-validator'
import { ValidationResultExpress } from '../middlewares/ValidationResult.js'

const router = Router()

router.post('/login',  [
  body('email', 'Email inválido').trim().isEmail().normalizeEmail(),
  body('password', 'Password inválido').isLength({min: 6})
],
ValidationResultExpress,
login)

router.post('/register', [
  body('email', 'Email inválido').trim().isEmail().normalizeEmail(),
  body('password', 'Password inválido').isLength({min: 6}),
  body('repassword', 'Contraseñas no coinciden').custom((value, {req}) => {
    return value === req.body.password
  })
], 
ValidationResultExpress,
register)

export default router