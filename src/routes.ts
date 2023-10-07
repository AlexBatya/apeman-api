import express from 'express'
import createRoute from './routes/createPattern.routes'
const router = express.Router();

router.use('/patterns', createRoute);

export default router;