import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import { Thought } from '../models';
/**
 * GET All Thoughts /thoughts
 * @param _req 
 * @param res 
 */
export const getThoughts = async (_req: Request, res: Response) => {
    try {
        const thoughts = await Thought.find();
        res.json(thoughts);
    } catch (error: any) {
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
export const getThoughtById = async (req: Request, res: Response) => {
    const { thoughtId } = req.params;
    try {
        const thought = await Thought.findById(thoughtId);
        if (thought) {
            res.json(thought);
        } else {
            res.status(404).json({
                message: 'Thought not found'
            });
        }
    } catch (error: any) {
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
export const createThought = async (req: Request, res: Response) => {
    try {
        const thought = await Thought.create(req.body);
        res.json(thought);
    } catch (err) {
        res.status(500).json(err);
    }
};

/**
 * PUT Update a Thought /thoughts/:thoughtId
 * @param req 
 * @param res 
 */
export const updateThought = async (req: Request, res: Response) => {
    const { thoughtId } = req.params;
    try {
        const thought = await Thought.findByIdAndUpdate(thoughtId, req
            .body, { new: true });
        if (thought) {
            res.json(thought);
        } else {
            res.status(404).json({
                message: 'Thought not found'
            });
        }
    }
    catch (error: any) {
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
export const deleteThought = async (req: Request, res: Response) => {
    const { thoughtId } = req.params;
    try {
        const thought = await Thought.findByIdAndDelete(thoughtId);
        if (thought) {
            res.json({
                message: 'Thought deleted'
            });
        } else {
            res.status(404).json({
                message: 'Thought not found'
            });
        }
    } catch (error: any) {
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
export const createReaction = async (req: Request, res: Response) => {
    const { thoughtId } = req.params;
    try {
        const thought = await Thought.findByIdAndUpdate(
            thoughtId,
            { $push: { reactions: req.body } },
            { new: true }
        );
        if (thought) {
            res.json(thought);
        } else {
            res.status(404).json({
                message: 'Thought not found'
            });
        }
    } catch (error: any) {
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
export const deleteReaction = async (req: Request, res: Response) => {
    const { thoughtId, reactionId } = req.params;
    try {
        const thought = await Thought.findByIdAndUpdate(
            thoughtId,
            { $pull: { reactions: { reactionId: new ObjectId(reactionId) } } },
            { new: true }
        );
        if (thought) {
            res.json(thought);
        } else {
            res.status(404).json({
                message: 'Thought not found'
            });
        }
    } catch (error: any) {
        res.status(500).json({
            message: error.message
        });
    }
};

/**
 * PUT Update a Reaction /thoughts/:thoughtId/reactions/:reactionId
 * @param req 
 * @param res 
 */
export const updateReaction = async (req: Request, res: Response) => {
    const { thoughtId, reactionId } = req.params;
    try {
        const thought = await Thought.findOneAndUpdate(
            { _id: thoughtId, 'reactions.reactionId': new ObjectId(reactionId) },
            { $set: { 'reactions.$': req.body } },
            { new: true }
        );
        if (thought) {
            res.json(thought);
        } else {
            res.status(404).json({
                message: 'Thought or Reaction not found'
            });
        }
    } catch (error: any) {
        res.status(500).json({
            message: error.message
        });
    }
};

/**
 * GET Reaction by id /thoughts/:thoughtId/reactions/:reactionId
 * @param req 
 * @param res 
 */
export const getReaction = async (req: Request, res: Response) => {
    const { thoughtId, reactionId } = req.params;
    try {
        const thought = await Thought.findOne(
            { _id: thoughtId, 'reactions.reactionId': new ObjectId(reactionId) },
            { 'reactions.$': 1 }
        );
        if (thought) {
            res.json(thought.reactions[0]);
        } else {
            res.status(404).json({
                message: 'Thought or Reaction not found'
            });
        }
    } catch (error: any) {
        res.status(500).json({
            message: error.message
        });
    }
};

/**
 * GET All Reactions /thoughts/:thoughtId/reactions
 * @param req 
 * @param res 
 */
export const getReactions = async (req: Request, res: Response) => {
    const { thoughtId } = req.params;
    try {
        const thought = await Thought.findById(thoughtId);
        if (thought) {
            res.json(thought.reactions);
        } else {
            res.status(404).json({
                message: 'Thought not found'
            });
        }
    } catch (error: any) {
        res.status(500).json({
            message: error.message
        });
    }
};