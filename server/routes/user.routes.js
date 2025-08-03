import express from "express";
import {
  getPublicCreation,
  getUserCreation,
  getUserData,
  isAuthenticated,
  toggleLikeCreation,
  userLogin,
  userLogout,
} from "../controller/user.controller.js";
import {auth} from "../middleware/auth.js"

const userRouter = express.Router();


userRouter.get("/is-auth",auth,isAuthenticated)
userRouter.get("/get-user-data", auth,getUserData);

userRouter.post("/login",userLogin);
userRouter.post("/logout", userLogout);
userRouter.get("/get-user-creation",auth, getUserCreation);
userRouter.get("/get-published-creations", getPublicCreation);
userRouter.post("/toggle-like-creation", auth,toggleLikeCreation);

export default userRouter;
