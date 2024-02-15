import { Router } from 'express';
const router = Router();
/**
 * @swagger
 * /login:
 *   post:
 *     summary: Get Navigation Route
 *     description: Retrieve a list of all users
 *     responses:
 *       200:
 *         description: A list of buildings
 *       500:
 *         description: Server error
 */
router.post('/login', (req, res) => {
   
});
/**
 * @swagger
 * /signup:
 *   post:
 *     summary: Get Navigation Route
 *     description: Retrieve a list of all users
 *     responses:
 *       200:
 *         description: A list of buildings
 *       500:
 *         description: Server error
 */
router.post('/signup', (req, res) => {
   
});

export default router;