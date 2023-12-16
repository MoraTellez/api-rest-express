import { User } from "../models/user.js"
import { generateRefeshToken, generateToken } from "../utils/tokenManager.js"

const register = async (req, res) => {
  const { email, password } = req.body
  try {
    let user = await User.findOne({email})
    if(user) throw new Error('Este correo ya está registrado')

    user = new User({email, password})
    await user.save()

    // Json Web Token
    const { token, expiresIn} = generateToken(user._id)
    generateRefeshToken(user.id, res)

    return res.status(201).json({ token, expiresIn})
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
    const { token, expiresIn} = generateToken(user._id)
    generateRefeshToken(user.id, res)

    res.json({token, expiresIn})
  } catch (error) {
    return res.status(404).json({error: error.message})
  }

}

const infoUser = async (req, res) => {
  try {
    const user = await User.findById(req.uid).lean().select(['-password'])
    if(!user) throw new Error('Error en las credenciales')
    return res.status(200).json({user})
  } catch (error) {
    return res.status(500).json({error: 'Ha ocurrido un error en el servidor' })
  }
}

const refreshToken = (req, res) => {
  try {
    const {token, expiresIn} = generateToken(req.uid)

    return res.json({token, expiresIn})
  } catch (error) {
    return res.status(500).json({error: 'Error del servidor'})
  }
}

const logout = (req, res) => {
  res.clearCookie('refreshToken')
  res.json({msg: 'proceso finalizado'})
}

export {
  login,
  register,
  infoUser,
  refreshToken,
  logout
}