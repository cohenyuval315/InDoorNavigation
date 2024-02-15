import { Router } from 'express';
const router = Router();
/**
 * @swagger
 * /admin2:
 *   post:
 *     summary: Get Navigation Route
 *     description: Retrieve a list of all users
 *     responses:
 *       200:
 *         description: A list of buildings
 *       500:
 *         description: Server error
 */
router.post('/admin1', (req, res) => {
   
});
/**
 * @swagger
 * /admin:
 *   post:
 *     summary: Get Navigation Route
 *     description: Retrieve a list of all users
 *     responses:
 *       200:
 *         description: A list of buildings
 *       500:
 *         description: Server error
 */
router.post('/admin2', (req, res) => {
   
});

export default router;