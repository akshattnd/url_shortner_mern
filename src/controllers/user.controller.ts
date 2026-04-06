
import db from "../db/index.js"
import { type UserInput } from "../schemas/user.schema.js"
import { usersTable} from "../models/index.js"
import { eq } from "drizzle-orm"
import { hashPassword } from "../utils/index.js"
export const createUser = async (user:UserInput) => {
  const {  salt, hashed } = hashPassword(user.password)
  const [newUser] =  await db.insert(usersTable).values({
    ...user,
    salt,
    password:hashed
  }).returning()
  return newUser
}
export const getUserByEmail = async (email:string)=>{
  const [user] =await  db.select().from(usersTable).where(eq(usersTable.email, email))
  return user
}
export const getUserById = async (id:string) => {
  const [user] = await  db.select().from(usersTable).where(eq(usersTable.id, id))
  return user;
}