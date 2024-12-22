import { Router } from "express";
const router = Router();
import {
  getAllUsers,
  getUserById,
  createUser,
    updateUser,
  deleteUser,
  addFriend,
  deleteFriend,
} from "../../controllers/userController.js";

// /api/users
router.route("/").get(getAllUsers);

// /api/users/:userId
router.route("/:userId").get(getUserById);

// POST a new user
router.route("/").post(createUser);

// PUT to update a user by their ID
router.route("/:userId").put(updateUser);

// DELETE a user by their ID
router.route("/:userId").delete(deleteUser);

// POST /api/users/:userId/friends/:friendId
router.route("/:userId/friends/:friendId").post(addFriend);

// DELETE /api/users/:userId/friends/:friendId
router.route("/:userId/friends/:friendId").delete(deleteFriend);

export { router as userRouter };