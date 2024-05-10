import e from "express";
import { commntPush, creatPost } from "../controllers/post.controller.js";
import { deletePost } from "../controllers/post.controller.js";
import { getPosts } from "../controllers/post.controller.js";
import { likeUnlike } from "../controllers/post.controller.js";
import { protectRouter } from "../middleware/protectRoute.js";
import { getLikesposts } from "../controllers/post.controller.js";
import { getFollowingpost } from "../controllers/post.controller.js";
const router=e.Router()

router.post('/create',protectRouter, creatPost)
router.delete('/delete/:id',protectRouter, deletePost)
router.post('/comment/:id',protectRouter,commntPush)
router.get('/getposts',protectRouter,getPosts)
router.get('likes/:id',protectRouter,getLikesposts)
router.post('/like/:id',protectRouter,likeUnlike)
router.get('/following',protectRouter,getFollowingpost)


export default router