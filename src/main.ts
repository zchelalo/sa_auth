import * as grpc from '@grpc/grpc-js'
import { server } from 'src/grpc_server'
import { app } from 'src/express_server'
import 'src/config'
import { logger } from 'src/helpers/logger'

async function main() {
  app.listen(process.env.REST_PORT, () => {
    logger.info(`Server running at http://0.0.0.0:${process.env.REST_PORT}`)
  })

  server.bindAsync(`0.0.0.0:${process.env.GRPC_PORT}`, grpc.ServerCredentials.createInsecure(), (err, port) => {
    if (err) {
      logger.error(err)
      return
    }
    logger.info(`Server running at http://0.0.0.0:${port}`)
  })
}

main()