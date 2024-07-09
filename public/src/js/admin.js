console.log('front login...')
const url = 'http://localhost:3000/usuarios'
const checkUrl = `${url}/check`

const token = localStorage.getItem('token')
const { role } = JSON.parse(atob(token.split('.')[1])) || ''
console.log(role)

if (role !== 'admin') {
  window.location.href = '/login'
}

const $adminTable = document.getElementById('admin-table')

const getUsuarios = async () => {
  const response = await fetch(url)
  const data = await response.json()
  console.log(data)
  $adminTable.innerHTML = ''

  data.forEach((user, index) => {
    $adminTable.innerHTML +=
      `
      <tr>
        <th scope="row">${index}</th>
        <td>
          <div></div>
        </td>
        <td>${user.nombre}</td>
        <td>${user.anos_experiencia}</td>
        <td>${user.especialidad}</td>
        <td>
          <input 
            type="checkbox" 
            ${user.estado ? 'checked' : ''}
            onclick="checkHandler('${user.email}')" 
          />
        </td>
      </tr>
      <tr>
      `
  })
}

getUsuarios()

async function checkHandler (email) {
  console.log('clicked ' + email)
  const response = await fetch(checkUrl, {
    method: 'put',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email })
  })
  const data = await response.json()
  window.alert(`el estado de ${data.nombre} (${data.email}) a cambiado a ${data.estado ? 'Aprobado' : 'En revisión'}`)
  console.log(data)
  getUsuarios()

  // onclick = "setInfoModal('${c.nombre}', '${c.balance}', '${c.id}')"
}
