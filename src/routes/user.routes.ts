import {Router} from 'express'
import { createUserSchema, loginUserSchema, type LoginUserSchema } from '../schemas/index.js'
import { createUser, getUserByEmail } from '../controllers/user.controler.js'
import { parsePgNestedArray } from 'drizzle-orm/pg-core'
import { generateJwtToken, hashPassword } from '../utils/index.js'
const router = Router()

router.post('/signup', async (req , res)=>{
    const result = await createUserSchema.safeParseAsync(req.body)

    if(!result.success) return res.status(400).json({
        error:result.error,
        message:"validation Error!"
    })
    try{    
        const payload = result.data
        const existingUser = await getUserByEmail(payload.email)
        
        if(existingUser) return res.status(400).json({
            message:`user with email ${payload.email} already exist`
        })

        const data = await createUser(result.data)
        return res.status(201).json({
            messsage:"user created!",
            data
        })
    }
    catch(err){
        return res.status(500).json({
            messsage: "Internal Server error",
            error: err instanceof Error ? err.message : err
        })
    }
     
})
router.post('/login', async (req, res)=>{

    const parsed = await loginUserSchema.safeParseAsync(req.body)
    if(parsed.error) return res.status(400).json({
        error:parsed.error.message,
        message:"validation Error!"
    })
    const {email, password} = parsed.data
    const existingUser = await getUserByEmail(email)
    if(!existingUser) return res.status(404).json({
        error:`user with email ${email} does not exisit`
    }) 
    const {hashed} = hashPassword(password, existingUser.salt)
    if(hashed !== existingUser.password){
        return res.status(400).json({
            error:"Incorrect Password"
        })
    }
    const token = await generateJwtToken({id:existingUser.id})
    return res.json({
        token,
        message:"Login token generated!"
    })
})
export default router