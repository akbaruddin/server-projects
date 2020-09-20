const fastify = require('fastify')({
  logger: true
})

fastify.register(require('fastify-cors'), {})
fastify.register(require('fastify-jwt'), {
  secret: 'supersecret',
  sign: { algorithm: 'HS512' }
})

fastify.decorate("authenticate", async function(request, reply) {
  try {
    await request.jwtVerify()
  } catch (err) {
    reply.send(err)
  }
})

fastify.get('/', async (request, reply) => {
  return { page: 'index' }
})

fastify.get('/users/me', {
  preHandler: [fastify.authenticate]
}, async (request, reply) => {
  const { user } = request.user
  return { user }
})

fastify.post('/auth/login', async (request, reply) => {
  const { user } = request.body;
  const token = fastify.jwt.sign({ user: request.body })
  reply.send({ token })
})

const start = async () => {
  try {
    await fastify.listen(8080)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

start()