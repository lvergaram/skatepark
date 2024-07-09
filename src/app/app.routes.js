import { Router } from 'express'
// import path from 'path'

const router = Router()

// const __dirname = import.meta.dirname
// const publicPath = path.join(__dirname, '../public')

router.get('/', (req, res) => {
  res.render('home', { title: 'skate-park' })
})

router.get('/login', (req, res) => {
  res.render('login', { title: 'login' })
})

router.get('/registro', (req, res) => {
  res.render('registro', { title: 'registro' })
})

router.get('/profile', (req, res) => {
  res.render('profile', { title: 'datos' })
})

router.get('/admin', (req, res) => {
  res.render('admin', { title: 'admin' })
})

router.get('/*', (req, res) => {
  res.render('404', { title: 'No encontrada' })
})

// router.get('/registro', (req, res) => {
//   res.sendFile(publicPath + '/registro.html')
// })

// router.get('/proyectos', (req, res) => {
//   res.sendFile(publicPath + '/proyectos.html')
// })

// router.get('/proyecto/:id', (req, res) => {
//   const { id } = req.params
//   id === 'nuevo'
//     ? res.sendFile(publicPath + '/proyecto-nuevo.html')
//     : res.sendFile(publicPath + '/proyecto.html')
// })

export default router
