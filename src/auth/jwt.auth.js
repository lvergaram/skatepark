import jwt from 'jsonwebtoken'

export const validateToken = (req, res, next) => {
  const rawToken = req.headers.authorization

  if (!rawToken) {
    return res.status(401).json({ ok: false, msg: 'missed token' })
  }

  // remove 'bearer' prefix
  const token = rawToken.split(' ')[1]

  try {
    const { email, role } = jwt.verify(token, process.env.JWT_SECRET)
    req.email = email
    req.role = role

    next()
  } catch (error) {
    console.log(error)
    return res.status(400).json({ ok: false, msg: 'invalid token' })
  }
}

export const validateAdmin = (req, res, next) => {
  console.log('validando admin')
  if (req.role_id === 1) {
    return next()
  }

  return res.status(403).json({ ok: false, msg: 'Unvalid Credentials' })
}
