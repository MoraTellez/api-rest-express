import { validationResult } from "express-validator"

const login = (req, res) => {
  res.json({ok: true})
}

const register = (req, res) => {

  console.log(req.body)
  res.json({ok: true})
}

export {
  login,
  register
}