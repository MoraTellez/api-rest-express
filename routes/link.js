import { Router } from 'express'
import { createLink, getLinks, getLink, removeLink } from '../controllers/LinkController.js'
import { requireToken } from '../middlewares/RequireToken.js'
import { bodyLinkValidator, paramsLinkValidator } from '../middlewares/ValidatorManager.js'
const router = Router()

router.get('/', requireToken, getLinks)
router.post('/', requireToken, bodyLinkValidator, createLink)

router.get('/:id', requireToken, paramsLinkValidator, getLink)
router.delete('/:id', requireToken, paramsLinkValidator, removeLink)

export default router