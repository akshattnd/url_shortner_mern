
import db from "../db/index.js"
import { urlsTable } from "../models/index.js"
import { nanoid } from "nanoid"
import { and, eq } from "drizzle-orm"
export const insertUrl = async (url:string, userId:string) =>{
   const [data] =  await db.insert(urlsTable).values({
        targetUrl:url,
        shortCode:nanoid(7),
        userId,
    }).returning()
    return data
}
export const getTargetUrl = async (url:string,userId:string) =>{
    // also check for userid
    const [targetUrl] = await db.select().from(urlsTable).where(and(eq(urlsTable.targetUrl, url),eq( urlsTable.userId, userId)));
    return targetUrl
}   

export const getAllTargetUrls = async (userId:string) =>{
    // also check for userid
    return await db.select().from(urlsTable).where(eq(urlsTable.userId,userId) );
    
}   
export const deleteShortcode = async(shortcode:string) =>{
    await db.delete(urlsTable).where(eq(urlsTable.shortCode, shortcode));
}
export const getUrlByShortCode = async (shortcode:string) =>{
    // also check for userid
    const [targetUrl] = await db.select().from(urlsTable).where(eq(urlsTable.shortCode, shortcode));
    return targetUrl
}   