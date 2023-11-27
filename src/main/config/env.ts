export default {
  mongoUrl:
    process.env.MONGO_URL ??
    'mongodb://root:root@localhost:27017/clean-node-api?authSource=admin',
  port: process.env.PORT ?? '5050',
  jwtSecret: process.env.JWT_SECRET ?? 'f34FDSoi34904!dl-sa0$)05df'
}
