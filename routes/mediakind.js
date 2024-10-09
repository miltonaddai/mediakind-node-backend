import express from 'express'
import {
    createStreamingPolicy, 
    getAllAssets
} from '../controllers/mediakind'

const router = express.Router();

router.put('/create-streaming-policy', createStreamingPolicy);
router.get('/get-assets', getAllAssets);

export default router;