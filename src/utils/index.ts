import { randomBytes } from "node:crypto"
import { createHmac } from "node:crypto"
export const hashedPassword = (password:string) =>{
      const salt = randomBytes(256).toString('hex')
      const hashed = createHmac('sha256',salt).update(password).digest('hex')
      return {
        salt, hashed
      }
}