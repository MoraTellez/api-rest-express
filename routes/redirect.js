import { Router } from 'express'
import { redirectLink } from '../controllers/RedirectController.js'
const router = Router()

router.get('/:nanoLink', redirectLink)

export default router