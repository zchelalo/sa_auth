import * as grpc from '@grpc/grpc-js'
import { server } from 'src/server'
import 'src/config'
import { logger } from 'src/helpers/logger'

function main() {
  server.bindAsync(`0.0.0.0:${process.env.PORT}`, grpc.ServerCredentials.createInsecure(), (err, port) => {
    if (err) {
      logger.error(err)
      return
    }
    logger.info(`Server running at http://0.0.0.0:${port}`)
  })
}

main()