import { randomBytes } from "node:crypto"
import { createHmac } from "node:crypto"
import jwt from "jsonwebtoken"
import { jwtPayloadSchema, type JwtPayloadSchema } from "../schemas/user.schema.js"
export const hashPassword = (password:string, salt:string| undefined = undefined) =>{
  if(!salt){
    salt = randomBytes(256).toString('hex');
  }
  const hashed = createHmac('sha256', salt).update(password).digest('hex')
  return {salt, hashed}
}
export const generateJwtToken = async (payload:JwtPayloadSchema) => {
  const parsed = await jwtPayloadSchema.safeParseAsync(payload)
  if(parsed.error) throw Error(parsed.error.message)
  return jwt.sign(payload, process.env.JWT_SECRET!)
}
export const decodeJwtToken = (token:string | undefined) => {
  try{
    if(!token) return null;
    const payload = jwt.verify(token,process.env.JWT_SECRET!)
    return payload
  }catch(err){
    return null
  }
}
