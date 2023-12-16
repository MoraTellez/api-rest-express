import jwt from "jsonwebtoken"

export const requireToken = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]
    if(!token) throw new Error('Credenciales inválidas')

    const { uid } = jwt.verify(token, process.env.JWT_SECRET)
    req.uid = uid 
    next()
  } catch (error) {
    return res.status(401).json({error: error.message})
  }
}