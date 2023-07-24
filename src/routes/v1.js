import express from "express";
const router = express.Router();


import usersModule from "./modules/users.module"
router.use("/users", usersModule)
import postsModule from "./modules/posts.module"
router.use("/posts", postsModule)
module.exports = router;