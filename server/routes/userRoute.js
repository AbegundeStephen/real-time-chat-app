import { fetchUsers,login,register,setAvatar,logout } from "../controllers/userController.js";
import { Router } from "express";

const userRoutes = Router();


userRoutes.post("/login",login);
userRoutes.post("/register",register);
userRoutes.get("/allusers/:id",fetchUsers);
userRoutes.post("/setavatar/:id",setAvatar)
userRoutes.get("logout",logout)

export default userRoutes


