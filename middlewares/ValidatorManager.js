import { validationResult, body, param} from "express-validator";

const ValidationResultExpress = (req, res, next) => {
  const errors = validationResult(req)

  if(!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  next()
}

export const paramsLinkValidator = [
  param('id', 'id inválido').trim().notEmpty().escape(),
  ValidationResultExpress
]

export const bodyLinkValidator = [
  body('longLink', 'Formtao de link inválido').trim().isURL()
  .custom(async value => {
    try {

      if(!value.startsWith('https://')) {
        value = 'https://' + value
      }

      await fetch(value)
    } catch (error) {
      throw new Error('link no encontrado')
    }
  }),
  ValidationResultExpress
]

export const bodyRegisterValidator = [
  body('email', 'Email inválido').trim().isEmail().normalizeEmail(),
  body('password', 'Password inválido').isLength({min: 6}),
  body('repassword', 'Contraseñas no coinciden').custom((value, {req}) => {
    return value === req.body.password
  }),
  ValidationResultExpress
]

export const bodyLoginValidator = [
  body('email', 'Email inválido').trim().isEmail().normalizeEmail(),
  body('password', 'Password inválido').isLength({min: 6}),
  ValidationResultExpress
]