import { Link } from "../models/link.js"

const redirectLink = async (req, res) => {
  try {
    const { nanoLink } = req.params
    const link = await Link.findOne({ nanoLink})

    if(!link) return res.status(404).json({ error: 'No existe el lnk'})
    
    return res.redirect(link.longLink)
  } catch (error) {
    return res.status(500).json({error: 'Error del server'})
  }
}

export { redirectLink}