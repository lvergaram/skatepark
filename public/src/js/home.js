console.log('front home...')

const url = 'http://localhost:3000/usuarios'
const $tablaUsuarios = document.getElementById('tabla-usuarios')

const getUsuarios = async () => {
  const response = await fetch(url)
  const data = await response.json()
  console.log(data)
  console.log($tablaUsuarios)
  $tablaUsuarios.innerHTML = ''

  data.forEach((user, index) => {
    $tablaUsuarios.innerHTML +=
      `
      <tr>
        <th scope="row">${index}</th>
        <td>
          <div> <img class="img-fluid" src="${user.foto}" alt=""> </div>
        </td>
        <td>${user.nombre}</td>
        <td>${user.nombre}</td>
        <td>${user.anos_experiencia}</td>
        <td>${user.especialidad}</td>
        <td class="text-${user.estado ? 'success' : 'warning'} font-weight-bold">${user.estado ? 'Aprobado' : 'En revisión'}</td>
      </tr>
      <tr>
      `
  })
}

getUsuarios()
