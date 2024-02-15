import { Router } from 'express';
const router = Router();
/**
 * @swagger
 * /navigation/:id:
 *   post:
 *     summary: Get Navigation Route
 *     description: Retrieve a list of all users
 *     responses:
 *       200:
 *         description: A list of buildings
 *       500:
 *         description: Server error
 */
router.post('/nav', (req, res) => {
   
});

export default router;