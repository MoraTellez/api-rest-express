import jwt from "jsonwebtoken"

export const generateToken = (uid) => {
  const expiresIn = 60 * 15 // 15 minutos
   try {
    const token = jwt.sign({uid}, process.env.JWT_SECRET, {expiresIn })
    return {token, expiresIn}
   } catch (error) {
    
   }
}

export const generateRefeshToken = (uid, res) => {
  const expiresIn = 60 * 60 * 24 * 30
  try {
    const refreshToken = jwt.sign({uid},process.env.JWT_REFRESH, {expiresIn})
    
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: !(process.env.MODO === 'developer '),
      expires: new Date(Date.now() + expiresIn * 1000)
    }) 
  } catch (error) {
    
  }
}