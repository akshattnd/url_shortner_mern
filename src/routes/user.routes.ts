import {Router} from 'express'
import { createUserSchema } from '../schemas/index.js'
import { createUser, getUserByEmail } from '../controllers/user.controler.js'
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
// router.post('/login', async (req, res)=>{
//     const 
//     const existingUser = 
// })
export default router