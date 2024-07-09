import { ddbb } from '../DATABASE/connection.ddbb.js'

const getAll = async () => {
  try {
    const query = {
      text: `
        SELECT * FROM skaters
      `
    }
    const { rows: response } = await ddbb.query(query)
    return response
  } catch (error) {
    console.log('error en petición a bbdd', error)
    throw error
  }
}

// const getOneById = async (id) => {
//   try {
//     const query = {
//       text: `
//         SELECT * FROM skaters
//         WHERE id = $1
//       `,
//       values: [id]
//     }
//     const { rows: response } = await ddbb.query(query)
//     return response[0]
//   } catch (error) {
//     console.log('error en petición a bbdd', error)
//     throw error
//   }
// }

const getOneByEmail = async (email) => {
  try {
    const query = {
      text: `
        SELECT * FROM skaters
        WHERE email = $1
      `,
      values: [email]
    }
    const { rows: response } = await ddbb.query(query)
    return response[0]
  } catch (error) {
    console.log('error en petición a bbdd', error)
    throw error
  }
}

const getAdminByEmail = async (email) => {
  try {
    const query = {
      text: `
        SELECT * FROM admins
        WHERE email = $1
      `,
      values: [email]
    }
    const { rows: response } = await ddbb.query(query)
    return response[0]
  } catch (error) {
    console.log('error en petición a bbdd', error)
    throw error
  }
}

const create = async (email, nombre, hashedPass, anos_experiencia, especialidad, foto) => {
  try {
    const query = {
      text: `
        INSERT INTO skaters (email, nombre, password, anos_experiencia, especialidad, foto)
        VALUES
        ($1,$2,$3,$4,$5,$6)
        RETURNING *
      `,
      values: [email, nombre, hashedPass, anos_experiencia, especialidad, foto]
    }
    const { rows: response } = await ddbb.query(query)
    return response[0]
  } catch (error) {
    console.log('error en petición a bbdd', error)
    throw error
  }
}

const update = async (newRegister) => {
  try {
    const { email, nombre, password, anos_experiencia, especialidad } = newRegister
    const query = {
      text: `
        UPDATE skaters
        SET
        nombre = $2,
        password = $3,
        anos_experiencia = $4,
        especialidad = $5
        WHERE email = $1
        RETURNING *
      `,
      values: [email, nombre, password, anos_experiencia, especialidad]
    }
    const { rows: response } = await ddbb.query(query)
    return response[0]
  } catch (error) {
    console.log('error en petición a bbdd', error)
    throw error
  }
}

const updateStatus = async (email) => {
  try {
    const query = {
      text: `
        UPDATE skaters
        SET
        estado = NOT estado
        WHERE email =$1
        RETURNING *
      `,
      values: [email]
    }
    const { rows: response } = await ddbb.query(query)
    return response[0]
  } catch (error) {
    console.log('error en petición a bbdd', error)
    throw error
  }
}

const remove = async (id) => {
  try {
    const query = {
      text: `
        DELETE FROM skaters
        WHERE ID = $1
        RETURNING *
      `,
      values: [id]
    }
    const { rows: response } = await ddbb.query(query)
    return response[0]
  } catch (error) {
    console.log('error en petición a bbdd', error)
    throw error
  }
}

const removeByEmail = async (email) => {
  try {
    const query = {
      text: `
        DELETE FROM skaters
        WHERE EMAIL = $1
        RETURNING *
      `,
      values: [email]
    }
    const { rows: response } = await ddbb.query(query)
    return response[0]
  } catch (error) {
    console.log('error en petición a bbdd', error)
    throw error
  }
}

export const userModel = {
  getAll,
  getOneByEmail,
  getAdminByEmail,
  create,
  update,
  updateStatus,
  removeByEmail,
  remove
}
