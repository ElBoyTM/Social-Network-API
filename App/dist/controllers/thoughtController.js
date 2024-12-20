import { ObjectId } from 'mongodb';
import { Thought } from '../models';
/**
 * GET All Thoughts /thoughts
 * @param _req
 * @param res
 */
export const getThoughts = async (_req, res) => {
    try {
        const thoughts = await Thought.find();
        res.json(thoughts);
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
/**
 * GET Thought by id /thoughts/:thoughtId
 * @param req
 * @param res
 */
export const getThoughtById = async (req, res) => {
    const { thoughtId } = req.params;
    try {
        const thought = await Thought.findById(thoughtId);
        if (thought) {
            res.json(thought);
        }
        else {
            res.status(404).json({
                message: 'Thought not found'
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
 * POST Create a Thought /thoughts
 * @param req
 * @param res
 */
export const createThought = async (req, res) => {
    try {
        const thought = await Thought.create(req.body);
        res.json(thought);
    }
    catch (err) {
        res.status(500).json(err);
    }
};
/**
 * PUT Update a Thought /thoughts/:thoughtId
 * @param req
 * @param res
 */
export const updateThought = async (req, res) => {
    const { thoughtId } = req.params;
    try {
        const thought = await Thought.findByIdAndUpdate(thoughtId, req
            .body, { new: true });
        if (thought) {
            res.json(thought);
        }
        else {
            res.status(404).json({
                message: 'Thought not found'
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
 * DELETE a Thought /thoughts/:thoughtId
 * @param req
 * @param res
 */
export const deleteThought = async (req, res) => {
    const { thoughtId } = req.params;
    try {
        const thought = await Thought.findByIdAndDelete(thoughtId);
        if (thought) {
            res.json({
                message: 'Thought deleted'
            });
        }
        else {
            res.status(404).json({
                message: 'Thought not found'
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
 * POST Create a Reaction /thoughts/:thoughtId/reactions
 * @param req
 * @param res
 */
export const createReaction = async (req, res) => {
    const { thoughtId } = req.params;
    try {
        const thought = await Thought.findByIdAndUpdate(thoughtId, { $push: { reactions: req.body } }, { new: true });
        if (thought) {
            res.json(thought);
        }
        else {
            res.status(404).json({
                message: 'Thought not found'
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
 * DELETE a Reaction /thoughts/:thoughtId/reactions/:reactionId
 * @param req
 * @param res
 */
export const deleteReaction = async (req, res) => {
    const { thoughtId, reactionId } = req.params;
    try {
        const thought = await Thought.findByIdAndUpdate(thoughtId, { $pull: { reactions: { reactionId: new ObjectId(reactionId) } } }, { new: true });
        if (thought) {
            res.json(thought);
        }
        else {
            res.status(404).json({
                message: 'Thought not found'
            });
        }
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
