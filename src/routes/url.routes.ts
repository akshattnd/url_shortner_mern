import { Router } from "express";   
import { urlInputSchema } from "../schemas/url.schema.js";
import { deleteShortcode, getAllTargetUrls, getTargetUrl, getUrlByShortCode, insertUrl } from "../controllers/url.controller.js";
import { emitWarning } from "node:process";
import { get } from "node:http";
import { url } from "node:inspector";
const router = Router()
router.post("/shorten", async (req, res) => {
    const userId = req.user?.id!;
    if(!userId) return res.status(404).json({
        error:"Authentication Required!"
    })
    const parsed = await urlInputSchema.safeParseAsync(req.body)
    if(parsed.error) return res.status(400).json({
        error:parsed.error.message
    })
    const {url} = parsed.data
    const existingTargetUrl = await  getTargetUrl(url,userId)
    if(existingTargetUrl)  return res.json({
        data: existingTargetUrl,
        messsage:"short code already exist!"
    })
    const data = insertUrl(url, userId);
    return res.status(201).json({
        data,
        message:"short code generated"
    })

})
router.get('/', async (req, res)=>{
    const userId = req.user?.id!;
    if(!userId) return res.status(404).json({
        error:"Authentication Required!"
    })
     const urls = getAllTargetUrls(userId);
     return res.json({
        data:urls,
        messsage:"urls fetched!"
     })
})
router.delete("/:shortcode", async (req, res)=>{
    const userId = req.user?.id!;
    if(!userId) return res.status(404).json({
        error:"Authentication Required!"
    })
    const shortcode = req.params.shortcode

    await deleteShortcode(shortcode)
    return res.json({
        message:"Deleted Successfully!"
    })
})
router.get("/:shortcode", async (req, res)=>{
    const userId = req.user?.id!;
    if(!userId) return res.status(404).json({
        error:"Authentication Required!"
    })
    const shortcode = req.params.shortcode
    const urlTable = await getUrlByShortCode(shortcode)
    if(!urlTable) return res.status(400).json({
        error:`url don't exist for given ${shortcode} short code`
    })
    return res.redirect(urlTable?.targetUrl)
})

export default router