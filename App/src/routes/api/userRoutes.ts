import { Router } from "express";
const router = Router();
import {
  getAllUsers,
  getUserById,
  createUser,
  deleteUser,
  addFriend,
  deleteFriend,
} from "../../controllers/userController.js";