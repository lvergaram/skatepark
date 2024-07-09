console.log('front login...')

const $loginForm = document.getElementById('login-form')

$loginForm.addEventListener('submit', (e) => {
  e.preventDefault()
  const $email = e.target.email.value
  const $password = e.target.password.value

  // validation
  if (!$password || !$email) {
    return window.alert('Debe Ingresar Usuario y Contraseña')
  }

  // solicutud POST
  const user = {
    email: $email,
    password: $password
  }

  fetch('http://localhost:3000/usuarios/login', {
    method: 'POST',
    body: JSON.stringify(user),
    headers: { 'Content-type': 'application/json; charset=UTF-8' }
  })
    .then(response => response.json())
    .then(json => {
      console.log(json)
      if (json.ok) {
        localStorage.setItem('token', json.msg)
        const { role } = JSON.parse(atob(json.msg.split('.')[1]))
        if (role === 'admin') {
          window.location.href = '/admin'
        } else {
          window.location.href = '/profile'
        }
      } else {
        window.alert('Usuario o Contraseña Incorrecta')
      }
    })
    .catch(err => console.log(err))
})
