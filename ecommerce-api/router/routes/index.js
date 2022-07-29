import root from "./root.js"
import shop from "./shop.js"
import login from "./login.js"
import register from "./register.js"
import me from "./me.js"

export default {
  get: {
    "/": root,
    "/shop": shop
  },
  post: {
    "/login": login,
    "/register": register,
    "/me": me
  }
}
