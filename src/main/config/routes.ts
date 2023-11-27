import { Express, Router } from 'express'
import { readdirSync } from 'fs'
import path from 'path'

export default (app: Express): void => {
  const router = Router()
  app.use('/api', router)
  readdirSync(path.join(__dirname, '/../routes'))
    .filter(
      (file) =>
        !file.includes('.test.') &&
        !file.includes('.spec.') &&
        !file.endsWith('.map')
    )
    .map(async (file) => {
      ;(await import(`../routes/${file}`)).default(router)
    })
}
