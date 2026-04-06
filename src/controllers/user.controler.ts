import { randomBytes, createHmac } from "node:crypto"
import db from "../db/index.js"
import { type UserInput } from "../schemas/user.schema.js"
import { usersTable} from "../models/index.js"
import { eq } from "drizzle-orm"
import { hashedPassword } from "../utils/index.js"
export const createUser = async (user:UserInput) => {
  const { hashed, salt } = hashedPassword(user.password)
  return await db.insert(usersTable).values({
    ...user,
    salt,
    password:hashed
  }).returning()
}
export const getUserByEmail = async (email:string)=>{
  const [user] =await  db.select().from(usersTable).where(eq(usersTable.email, email))
  return user
}
export const getUserById = async (id:string) => {
  const [user] = await  db.select().from(usersTable).where(eq(usersTable.id, id))
  return user;
}