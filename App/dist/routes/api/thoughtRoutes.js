import { Router } from 'express';
const router = Router();
import { getThoughts, getThoughtById, createThought, updateThought, deleteThought, createReaction, deleteReaction } from '../../controllers/thoughtController';
// GET all thoughts /thoughts
router.get('/', getThoughts);
// GET thought by id /thoughts/:thoughtId
router.get('/:thoughtId', getThoughtById);
// POST create a thought /thoughts
router.post('/', createThought);
// PUT update a thought /thoughts/:thoughtId
router.put('/:thoughtId', updateThought);
// DELETE a thought /thoughts/:thoughtId
router.delete('/:thoughtId', deleteThought);
// POST create a reaction /thoughts/:thoughtId/reactions
router.post('/:thoughtId/reactions', createReaction);
// DELETE a reaction /thoughts/:thoughtId/reactions/:reactionId
router.delete('/:thoughtId/reactions/:reactionId', deleteReaction);
export { router as thoughtRouter };
