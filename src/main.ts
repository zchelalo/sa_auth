import * as grpc from '@grpc/grpc-js'
import { server } from 'src/grpc_server'
import 'src/config'
import { logger } from 'src/helpers/logger'

async function main() {
  server.bindAsync(`0.0.0.0:${process.env.GRPC_PORT}`, grpc.ServerCredentials.createInsecure(), (err, port) => {
    if (err) {
      logger.error(err)
      return
    }
    logger.info(`Server running at http://0.0.0.0:${port}`)
  })
}

main()