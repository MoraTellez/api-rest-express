import { Router } from 'express'
import { createLink, getLinks, getLink, removeLink, updateLink } from '../controllers/LinkController.js'
import { requireToken } from '../middlewares/RequireToken.js'
import { bodyLinkValidator, paramsLinkValidator } from '../middlewares/ValidatorManager.js'
const router = Router()

router.get('/', requireToken, getLinks)
router.post('/', requireToken, bodyLinkValidator, createLink)

// router.get('/:id', requireToken, paramsLinkValidator, getLink)
router.get('/:nanoLink', getLink)

router.delete('/:id', requireToken, paramsLinkValidator, removeLink)
router.patch('/:id', requireToken, paramsLinkValidator, bodyLinkValidator, updateLink)

export default router