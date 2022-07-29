import { faker } from '@faker-js/faker'
import { hashPassword } from 'ecommerce-api/service/encrypt.js'

describe("", () => {
    it("hashPassword", async () => {
        const password = faker.internet.password()
        const hash = await hashPassword(password)
        expect(hash).not.toBe(password)
    })
})
