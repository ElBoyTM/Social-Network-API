import { Router } from 'express';
const router = Router();
import {
  getThoughts,
  getThoughtById,
  createThought,
  updateThought,
  deleteThought,
  createReaction,
  deleteReaction
} from '../../controllers/thoughtController';