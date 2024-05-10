import e from "express";
import { protectRouter } from "../middleware/protectRoute.js";
import { deleteNotification } from "../controllers/notification.controller.js";
import { getNotification } from "../controllers/notification.controller.js";
import { deleteOneN } from "../controllers/notification.controller.js";
const router=e.Router()
router.get('/notifications',protectRouter,getNotification);
router.delete('/deleteN',protectRouter,deleteNotification);
router.delete('/deleteN/:id',protectRouter,deleteOneN)
export default router