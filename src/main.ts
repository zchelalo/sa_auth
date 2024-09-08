import { app } from 'src/server'
import 'src/config'
import { logger } from 'src/helpers/logger'

app.listen(process.env.PORT, () => logger.info(`Server is running on port ${process.env.PORT}`))