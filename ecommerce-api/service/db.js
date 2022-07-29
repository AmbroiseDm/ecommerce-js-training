import util from 'util'
import { Low, JSONFile } from 'lowdb'
import { findWhere, isEmpty } from 'underscore'
import { hashPassword } from './encrypt.js'
import { resolve, join } from 'path'

const rootDir = resolve()
const database = join(rootDir, "database", "db.json")

export const connectDb = async () => {
  const adapter = new JSONFile(database)
  const db = new Low(adapter)
  await db.read()

  // Create the initial "tables"
  if (!db.data) {
    db.data = { users: [] }
    await db.write()
  }
 return db
}

export const getUser = async email => {
  const { data } = await connectDb()
  const { users } = data
  return findWhere(users, { email })
}

export const userExist = async (email) => {
  const { data } = await connectDb()
  const { users } = data
  const user = findWhere(users, { email })
  return !isEmpty(user)
}

export const insertUser = async (email, password) =>  {
  const db = await connectDb()
  const { users } = db.data
  const exists = await userExist(email)
  if (!exists) {
    users.push({
      email,
      password: await hashPassword(password)
    })
    await db.write()
  }
  return await getUser(email)
}
