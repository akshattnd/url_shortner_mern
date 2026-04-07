import type { Request,Response, NextFunction } from "express"
import { decodeJwtToken } from "../utils/index.js";
import type { User } from "../models/user.model.js";
export const authMiddlware = (req:Request, res:Response, next:NextFunction) =>{
    const authHeader = req.headers['authorization'];
    if(!authHeader) return next();
    
    if(!authHeader.startsWith("Bearer")) return res.status(400).json({
        error:"authorization header must start with Bearer"
    });
    
    const [_, token] = authHeader.split(" ");
    req.user = decodeJwtToken(token) as User
    return next()

}
export const ensureAuthenticated = (req:Request, res:Response, next:NextFunction) =>{
    if(!req.user || !req.user.id) return res.status(401).json({
        error:"Authentication is required to acess this route!"
    })
    return next()
}