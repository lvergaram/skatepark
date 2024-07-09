import { userModel } from './user.model.js'
import jwt from 'jsonwebtoken'
import bcryptjs from 'bcryptjs'
import 'dotenv/config'
import path from 'path'

const getAll = async (req, res) => {
  try {
    const response = await userModel.getAll()
    res.json(response)
  } catch (error) {
    console.log(error)
    res.status(500).json({ ok: false })
  }
}

const getOneByEmail = async (req, res) => {
  try {
    const { email } = req.params
    const response = await userModel.getOneByEmail(email)
    res.json(response)
  } catch (error) {
    console.log(error)
    res.status(500).json({ ok: false })
  }
}

const create = async (req, res) => {
  try {
    if (!req.body.nombre || !req.body.balance) {
      return res.status(400).json({ ok: false, msg: 'se requiere nombre y balance del usuario' })
    }
    const newRegister = req.body
    const response = await userModel.create(newRegister)
    res.json(response)
  } catch (error) {
    console.log(error)
    res.status(500).json({ ok: false })
  }
}

const update = async (req, res) => {
  try {
    if (
      !req.body.email ||
      !req.body.nombre ||
      !req.body.password ||
      !req.body.anos_experiencia ||
      !req.body.especialidad
    ) {
      return res.status(400).json({ ok: false, msg: 'se requiere correo, nombre, password, años de experiencia y especialidad' })
    }
    const newRegister = req.body
    const response = await userModel.update(newRegister)
    res.json(response)
  } catch (error) {
    console.log(error)
    res.status(500).json({ ok: false })
  }
}

const updateStatus = async (req, res) => {
  try {
    if (!req.body.email) {
      return res.status(400).json({ ok: false, msg: 'se requiere correo' })
    }
    const response = await userModel.updateStatus(req.body.email)
    res.json(response)
  } catch (error) {
    console.log(error)
    res.status(500).json({ ok: false })
  }
}

const remove = async (req, res) => {
  try {
    const { email } = req.params
    const response = await userModel.removeByEmail(email)
    res.json({ ok: true, msg: response })
  } catch (error) {
    console.log(error)
    res.status(500).json({ ok: false })
  }
}

export const login = async (req, res) => {
  try {
    const { email, password } = req.body
    console.log({ email, password })

    let userRole = ''
    let user = await userModel.getAdminByEmail(email)

    if (user) {
      userRole = 'admin'
    } else {
      user = await userModel.getOneByEmail(email)
      if (!user) {
        return res.status(400).json({ ok: false, msg: 'Usuario no existe' })
      }
    }

    const passwordMatched = await bcryptjs.compare(password, user.password)

    if (passwordMatched || password !== user.password) {
      return res.status(400).json({ ok: false, msg: 'Clave incorrectas' })
    }

    const token = jwt.sign(
      {
        email: user.email,
        role: userRole || 'user'
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '1h'
      }
    )

    return res.json({ ok: true, msg: token })
  } catch (error) {
    console.log(error)
    res.status(500).json({ ok: false, message: 'Error de servidor' })
  }
}

const register = async (req, res) => {
  try {
    const { email, nombre, password, anos_experiencia, especialidad, foto } = req.body

    // validation
    if (!email || !nombre || !password || !anos_experiencia || !especialidad || !foto) {
      return res.status(400).json({ ok: false, msg: 'All fields are required' })
    }

    const user = await userModel.getOneByEmail(email)
    if (user) {
      return res.status(400).json({ ok: false, msg: 'correo ya existe' })
    }

    // encriptado password
    const salts = await bcryptjs.genSalt(10)
    const hashedPass = await bcryptjs.hash(password, salts)

    const newUser = await userModel.create(email, nombre, hashedPass, anos_experiencia, especialidad, foto)
    console.log(newUser)

    const token = jwt.sign(
      {
        email: newUser.email
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '1h'
      }
    )

    return res.status(201).json({ ok: true, data: { token } })
  } catch (error) {
    console.log(error)
    res.status(500).json({ ok: false, message: 'Error de servidor' })
  }
}

const registerImage = async (req, res) => {
  try {
    const __dirname = import.meta.dirname
    console.log(req.files)
    const { user } = req.body
    console.log({ user })
    const { file } = req.files
    console.log(file)
    file.mv(path.join(__dirname, '../../public/src/img', `${user}.jpg`), (err) => {
      if (err) console.log(err)
    })
    return res.status(201).json({ ok: true, imageSrc: `./src/img/${user}.jpg` })
  } catch (error) {
    console.log(error)
    res.status(500).json({ ok: false, message: 'Error de servidor' })
  }
}

export const userController = {
  getAll,
  getOneByEmail,
  login,
  register,
  registerImage,
  create,
  update,
  updateStatus,
  remove
}
