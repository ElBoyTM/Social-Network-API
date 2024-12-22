import { User } from "../models/index.js";
/**
 * GET All Users /users
 * @returns an array of Users
 */
export const getAllUsers = async (_req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
/**
 * GET User based on id /user/:id
 * @param string id
 * @returns a single User object
 */
export const getUserById = async (req, res) => {
    const { userId } = req.params;
    try {
        const user = await User.findById(userId);
        if (user) {
            res.json(user);
        }
        else {
            res.status(404).json({
                message: 'User not found'
            });
        }
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
/**
 * POST User /users
 * @param object username
 * @returns a single User object
 */
export const createUser = async (req, res) => {
    const { user } = req.body;
    try {
        const newUser = await User.create(user);
        res.status(201).json(newUser);
    }
    catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};
/**
 * PUT User based on id /users/:id
 * @param string id
 * @param object username
 * @returns a single User object
 */
export const updateUser = async (req, res) => {
    const { userId } = req.params;
    const { user } = req.body;
    try {
        const updatedUser = await User.findOneAndUpdate({ _id: userId }, user, { new: true });
        if (updatedUser) {
            res.json(updatedUser);
        }
        else {
            res.status(404).json({
                message: 'User not found'
            });
        }
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
/**
 * DELETE User based on id /users/:id
 * @param string id
 * @returns string
 */
export const deleteUser = async (req, res) => {
    const { userId } = req.params;
    try {
        const deletedUser = await User.findOneAndDelete({ _id: userId });
        if (deletedUser) {
            res.json(deletedUser);
        }
        else {
            res.status(404).json({
                message: 'User not found'
            });
        }
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
/**
 * POST User to friends list /users/:userId/friends/:friendId
 * @param string userId, friendId
 * @returns a single User object
 */
export const addFriend = async (req, res) => {
    const { userId, friendId } = req.params;
    try {
        const updatedUser = await User.findOneAndUpdate({ _id: userId }, { $addToSet: { friends: friendId } }, { new: true });
        if (updatedUser) {
            res.json(updatedUser);
        }
        else {
            res.status(404).json({
                message: 'User not found'
            });
        }
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
/**
 * DELETE User from friends list /users/:userId/friends/:friendId
 * @param string userId, friendId
 * @returns a single User object
 */
export const deleteFriend = async (req, res) => {
    const { userId, friendId } = req.params;
    try {
        const updatedUser = await User.findOneAndUpdate({ _id: userId }, { $pull: { friends: friendId } }, { new: true });
        if (updatedUser) {
            res.json(updatedUser);
        }
        else {
            res.status(404).json({
                message: 'User not found'
            });
        }
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
