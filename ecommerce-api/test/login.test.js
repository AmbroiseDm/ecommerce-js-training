import axios from 'axios'
import { faker } from '@faker-js/faker'
import { insertUser } from 'ecommerce-api/service/db.js'

describe("login", () => {
    it("checking login", async () => {
      const email = faker.internet.email()
      const password = faker.internet.password()
      const json = JSON.stringify({
          "email": email,
          "password": password
      })

      // testing unregistered user login
      const unregistered_user_response = await axios.post('http://localhost:3000/login', json, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      expect(unregistered_user_response.data.error).toEqual('ERR001')
      expect(unregistered_user_response.token).toBe(null)
      expect(unregistered_user_response.status).toEqual(200)

      // testing user login
      await insertUser(email, password)
      const response = await axios.post('http://localhost:3000/login', json, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      expect(response.data.error).not.toBe('ERR001')
      expect(response.data.token).not.toBe(null)
      expect(response.status).toEqual(200)
    })
  })