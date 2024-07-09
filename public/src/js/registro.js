console.log('front registro...')
const url = 'http://localhost:3000/usuarios/register'

const $registroForm = document.getElementById('registro-form')
console.log($registroForm)

$registroForm.addEventListener('submit', async (e) => {
  e.preventDefault()
  const $email = e.target.email.value
  const $nombre = e.target.nombre.value
  const $password = e.target.password.value
  const $password2 = e.target.password2.value
  const $annos = e.target.annos.value
  const $especialidad = e.target.especialidad.value
  const $foto = 'foto'

  if ($password !== $password2) {
    window.alert('las constraseñas no coinciden')
    return false
  }

  try {
  // Envío de imagen
    const imageFile = document.querySelector('input[type="file"]')
    const fileData = new FormData()
    fileData.append('file', imageFile.files[0])
    fileData.append('user', $email)

    const uploadImageResponse = await fetch(`${url}/image`, {
      method: 'POST',
      body: fileData
    })

    const imageResponse = await uploadImageResponse.json()
    console.log(imageResponse)

    const newUser = {
      email: $email,
      nombre: $nombre,
      password: $password,
      anos_experiencia: $annos,
      especialidad: $especialidad,
      foto: `./src/img/${$email}.jpg`
    }

    console.log(newUser)

    const response = await fetch(url, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newUser)
    })
    const data = await response.json()

    if (data.ok) {
      window.alert('Usuario Creado - Puede iniciar sesión')
      window.location.href = '/login'
    }
  } catch (e) {
    console.log(e)
    window.alert('Algo salió mal...' + e)
  }
})
