import { Link } from '../models/link.js'
import { nanoid } from 'nanoid'

const getLinks = async (req, res) => {
  try {
    const links = await Link.find({uid: req.uid})
    res.status(201).json({links})
  } catch (error) {
    return res.status(500).json({error: 'error del servidor '})
  }
}

// const getLink = async (req, res) => {
//   try {
//     const { id } = req.params
//     const link = await Link.findById(id)

//     if(!link) return res.status(404).json({error: 'no existe el link'})
//     if(!link.uid.equals(req.uid)) return res.status(401).json({error: 'acceso denegado'})

//     res.status(201).json({link})
//   } catch (error) {
//     return res.status(500).json({error: 'error del servidor '})
//   } 
// }


const getLink = async (req, res) => {
  try {
    const { nanoLink } = req.params
    const link = await Link.findOne({nanoLink})

    if(!link) return res.status(404).json({error: 'no existe el link'})

    res.status(201).json({longLink: link.longLink})
  } catch (error) {
    return res.status(500).json({error: 'error del servidor '})
  } 
}

const createLink = async (req, res) =>{
  try {
    const { longLink } = req.body
    const link = new Link({longLink, nanoLink: nanoid(6), uid: req.uid})
    const newLink = await link.save()

    return res.status(201).json({ newLink })
  } catch (error) {
    return res.status(500).json({error: 'error del servidor'})
  }
}

const removeLink = async (req, res) => {
  try {
    const { id } = req.params
    const link = await Link.findById(id)

    if(!link) return res.status(404).json({error: 'no existe el link'})
    if(!link.uid.equals(req.uid)) return res.status(401).json({error: 'acceso denegado'})

    await Link.deleteOne(link)

    res.status(201).json({link})
  } catch (error) {
    return res.status(500).json({error: 'error del servidor '})
  }
}

const updateLink = async (req, res) => {
  try {
    const { id } = req.params
    const { longLink } = req.body

    console.log(longLink)

    const link = await Link.findById(id)

    if(!link) return res.status(404).json({error: 'no existe el link'})
    if(!link.uid.equals(req.uid)) return res.status(401).json({error: 'acceso denegado'})

    link.longLink = longLink
    await link.save()

    res.status(201).json({link})
  } catch (error) {
    return res.status(500).json({error: 'error del servidor '})
  }
}

export {
  getLinks,
  getLink,
  createLink,
  removeLink,
  updateLink  
}