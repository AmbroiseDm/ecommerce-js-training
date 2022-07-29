import routes from './routes/index.js'
import _ from 'underscore'

export class Router {
  constructor(app) {
    this.app = app

    this.attachRoutes()
  }

  attachRoutes() {
    const methodKeys = _.keys(routes)
    for (const methodKey of methodKeys) {
      const routesOnMethod = routes[methodKey]
      const paths = _.keys(routesOnMethod)
      for (const path of paths) {
        this.app[methodKey](path, routesOnMethod[path])
      }
    }
  }
}
