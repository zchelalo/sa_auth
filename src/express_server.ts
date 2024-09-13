import express from 'express'
import fs from 'fs/promises'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const app = express()

app.use(express.json())

app.get('/jwks', async (req, res) => {
  try {
    const jwks = await fs.readFile(join(dirname(fileURLToPath(import.meta.url)), '../', 'certs', 'jwks', 'jwks_access.json'), 'utf-8')
    res.status(200).json({
      status: 200,
      message: 'success',
      data: JSON.parse(jwks)
    })
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({
        status: 500,
        message: error.message
      })
      return
    }

    res.status(500).json({
      status: 500,
      message: 'Internal server error'
    })
  }
})

export { app }