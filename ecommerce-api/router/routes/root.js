
export default async (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  res.send(JSON.stringify({
    "app": "ecommerce-sample",
    "version": 1
  }))
}
