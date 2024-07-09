console.log('front profile...')
const url = 'http://localhost:3000/usuarios'

const token = localStorage.getItem('token')
const { email: userEmail } = JSON.parse(atob(token.split('.')[1]))

if (!token) {
  window.location.href = '/login'
}

const $email = document.getElementById('email')
const $nombre = document.getElementById('nombre')
const $password = document.getElementById('password')
const $password2 = document.getElementById('password2')
const $annos = document.getElementById('annos')
const $especialidad = document.getElementById('especialidad')

const $updateAccountBtn = document.getElementById('update-account-btn')
const $deleteAccountBtn = document.getElementById('delete-account-btn')

// GET USER DATA
const getUsuario = async () => {
  const response = await fetch(`${url}/${userEmail}`)
  const data = await response.json()

  $email.value = data.email
  $nombre.value = data.nombre
  $password.value = data.password
  $password2.value = data.password
  $annos.value = data.anos_experiencia
  $especialidad.value = data.especialidad

  // data.forEach((user, index) => {
  //   $tablaUsuarios.innerHTML +=
  //     `
  //     <tr>
  //       <th scope="row">${index}</th>
  //       <td>
  //         <div></div>
  //       </td>
  //       <td>${user.nombre}</td>
  //       <td>${user.anos_experiencia}</td>
  //       <td>${user.especialidad}</td>
  //       <td class="text-${user.estado ? 'success' : 'warning'} font-weight-bold">${user.estado ? 'Aprobado' : 'En revisión'}</td>
  //     </tr>
  //     <tr>
  //     `
  // })
}

getUsuario()

// UPDATE USER DATA
$updateAccountBtn.addEventListener('click', async (e) => {
  e.preventDefault()
  if ($password.value !== $password2.value) {
    window.alert('las constraseñas no coinciden')
    return false
  }

  try {
    const newUser = {
      email: $email.value,
      nombre: $nombre.value,
      password: $password.value,
      anos_experiencia: $annos.value,
      especialidad: $especialidad.value
    }

    console.log(newUser)

    const response = await fetch(url, {
      method: 'put',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newUser)
    })
    const data = await response.json()
    console.log(data)

    if (data.ok) {
      getUsuario()
      window.alert('Usuario Actualizado con éxtio')
    }
  } catch (e) {
    console.log(e)
    window.alert('Algo salió mal...' + e)
  }
})

// DELETE USER DATA
$deleteAccountBtn.addEventListener('click', async (e) => {
  e.preventDefault()
  try {
    if ($password.value !== $password2.value) {
      window.alert('las constraseñas no coinciden')
      return false
    }

    console.log(`${url}/${userEmail}`)
    const response = await fetch(`${url}/${userEmail}`, {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const data = await response.json()
    console.log(data)

    if (data.ok) {
      window.alert('Usuario Eliminado con éxtio')
      localStorage.clear()
      window.location.href = '/login'
    }
  } catch (e) {
    console.log(e)
    window.alert('Algo salió mal...' + e)
  }
})
