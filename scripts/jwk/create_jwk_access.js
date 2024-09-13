import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import jose from 'node-jose'
import fs from 'fs/promises'

const createJwks = async () => {
  const certsPath = join(dirname(fileURLToPath(import.meta.url)), '../../certs')
  const accessPem = await fs.readFile(join(certsPath, 'rsa', 'private_access.pem'))

  let obj = {
    keys: []
  }

  try {
    const jwk = (await jose.JWK.asKey(accessPem, 'pem')).toJSON()
    obj.keys.push(jwk)
  } catch (error) {
    console.error('Error creating JWK')
  }

  console.log(JSON.stringify(obj, null, 2))
}

createJwks()