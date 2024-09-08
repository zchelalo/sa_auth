import express from 'express'

import cors from 'cors'
import cookieParser from 'cookie-parser'
import { responseMiddleware } from 'src/middlewares/response'
import { logRequestMiddleware } from 'src/middlewares/log_request'
import { logErrors, unknownErrorHandler, customErrorHandler } from 'src/middlewares/error'

import { router as userRouter } from 'src/modules/user/infrastructure/router'
import { router as authRouter } from 'src/modules/auth/infrastructure/router'

import { ForbiddenError } from 'src/helpers/errors/custom_error'

import { serve, setup } from 'swagger-ui-express'
import { swaggerSpec } from 'src/config/swagger'

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(logRequestMiddleware)
app.use(responseMiddleware)

const whitelist = ['http://localhost:5173', 'http://localhost:8000']
app.use(cors({
  origin: (origin, callback) => {
    if (whitelist.includes(origin as string) || !origin) {
      callback(null, true)
    } else {
      callback(new ForbiddenError())
    }
  },
  credentials: true
}))

app.use('/api', userRouter)
app.use('/api', authRouter)

app.use('/docs', serve, setup(swaggerSpec))

app.use(logErrors)
app.use(customErrorHandler)
app.use(unknownErrorHandler)

export { app }