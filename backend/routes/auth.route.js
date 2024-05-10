import e from "express";
import { getMe, login, logout, signup } from "../controllers/auth.controller.js";
import { protectRouter } from "../middleware/protectRoute.js";
const router=e.Router();

router.get('/me',protectRouter,getMe)
router.post('/signup',signup)
router.post('/login',login)
router.post('/logout',logout)
router.get("/up",(req,res)=>{
    res.send(req.body.id)
})



export default router;

