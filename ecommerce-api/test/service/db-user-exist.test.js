import { faker } from '@faker-js/faker'
import { userExist } from 'ecommerce-api/service/db.js'

describe("exists user", () => {
    it("userExist call method", async () => {
      const email = faker.internet.email()
      const exists = await userExist(email)
      expect(exists).toBe(false)
    })
  })
