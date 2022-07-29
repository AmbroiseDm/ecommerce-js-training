import { faker } from '@faker-js/faker'
import { insertUser, getUser, userExist, connectDb } from 'ecommerce-api/service/db.js'

describe("insert service", () => {
    it("insertUser call method", async () => {
      const email = faker.internet.email()
      const password = faker.internet.password()
      let exists = await userExist(email)
      expect(exists).toBe(false)

      // register
      await insertUser(email, password)

      // check register
      exists = await userExist(email)
      expect(exists).toBe(true)

      // testing get usr
      const user = await getUser(email)
      expect(user.email).toEqual(email)
      expect(user.password).not.toBe(password)
    })
  })
