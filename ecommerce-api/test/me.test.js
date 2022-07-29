import axios from 'axios'
import { faker } from '@faker-js/faker'
import { insertUser } from 'ecommerce-api/service/db.js'

describe("me", () => {
    it("checking me", async () => {
        const email = faker.internet.email()
        const password = faker.internet.password()
        const user_json = JSON.stringify({
            "email": email,
            "password": password
        })
        // testing user login
        await insertUser(email, password)
        const login_response = await axios.post('http://localhost:3000/login', user_json, {
            headers: {
            'Content-Type': 'application/json'
            }
        })
        const json = JSON.stringify({
            token: login_response.data.token
        })
        const response = await axios.post('http://localhost:3000/me', json, {
            headers: {
            'Content-Type': 'application/json'
            }
        })
        expect(response.data.email).toEqual(email)
        expect(response.status).toEqual(200)
    })
  })