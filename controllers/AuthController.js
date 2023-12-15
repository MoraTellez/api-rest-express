import { User } from "../models/user.js"
import jwt from "jsonwebtoken"

const register = async (req, res) => {
  const { email, password } = req.body
  try {
    let user = await User.findOne({email})
    if(user) throw new Error('Este correo ya está registrado')

    user = new User({email, password})
    await user.save()

    // Json Web Token
    

    return res.status(201).json({msg: "Usuario registrado con éxito"})
  } catch (error) {
    return res.status(400).json({error: error.message})
  }
}

const login = async (req, res) => {
  const { email, password} = req.body
  try {
    let user = await User.findOne({email})
    if(!user) throw new Error('El usuario no existe')

    const isValidPassword = await user.comparePassword(password)
    if(!isValidPassword) throw new Error('Los datos son incorrectos')

    // Json Web Token
    const token = jwt.sign({uid: user._id}, process.env.JWT_SECRET)

    res.json({token})
  } catch (error) {
    return res.status(404).json({error: error.message})
  }

}

export {
  login,
  register
}