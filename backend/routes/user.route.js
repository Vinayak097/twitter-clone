import e from "express";
import { protectRouter } from "../middleware/protectRoute.js";
import { getUserprofile } from "../controllers/user.controller.js";
import { followUnfollowUser } from "../controllers/user.controller.js";
import { getSuggestedUser } from "../controllers/user.controller.js";
import { userUpdate } from "../controllers/user.controller.js";
const router=e.Router("express")
router.get('/profile/:username',protectRouter,getUserprofile)
router.get('/suggested',protectRouter,getSuggestedUser)
router.post("/follow/:id",protectRouter,followUnfollowUser)
router.put("/update",protectRouter,userUpdate)

export default router;