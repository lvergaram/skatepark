import pg from 'pg'
import 'dotenv/config'

const { Pool } = pg

export const ddbb = new Pool({ allowExitOnIdle: true })

try {
  const { rows: result } = await ddbb.query('SELECT NOW()')
  console.log(`BBDD CONECTADA A LAS ${result[0].now} 🔥🔥🔥`)
} catch (error) {
  console.log(error)
}
