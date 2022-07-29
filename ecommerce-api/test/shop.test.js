import axios from 'axios'

describe("shop", () => {
  it("get shop information on /shop endpoint", async () => {
    const response = await axios.get('http://localhost:3000/shop')
    const data = response.data

    expect(response.status).toEqual(200)
    expect(data.name).toEqual("Test Ecommerce")
  })
})
