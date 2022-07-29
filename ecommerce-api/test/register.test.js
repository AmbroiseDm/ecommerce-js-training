import axios from 'axios'
import { faker } from '@faker-js/faker'

describe("register", () => {
    it("checking register", async () => {
      const email = faker.internet.email()
      const password = faker.internet.password()
      const json = JSON.stringify({
          "email": email,
          "password": password
      })

      // testing register
      const response = await axios.post('http://localhost:3000/register', json, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      expect(response.data.error).not.toBe('ERR001')
      expect(second_response.data.token).not.toBe(null)
      expect(response.status).toEqual(200)

      // testing register with already registered email
      const second_response = await axios.post('http://localhost:3000/register', json, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      expect(second_response.data.error).toEqual('ERR001')
      expect(second_response.data.token).toBe(null)
      expect(second_response.status).toEqual(200)
    })
  })

