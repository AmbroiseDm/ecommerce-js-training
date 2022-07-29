import axios from 'axios'

describe("root", () => {
  it("checking root api information", async () => {
    const response = await axios.get('http://localhost:3000/')
    const data = response.data
    expect(response.headers['access-control-allow-origin']).toEqual('*')    
    expect(response.status).toEqual(200)
    expect(data.app).toEqual("ecommerce-sample")
    expect(data.version).toEqual(1)
  })
})