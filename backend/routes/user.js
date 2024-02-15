import { Router } from 'express';
import validator from 'validator';
import BuildingData from '../models/BuildingData'
import { BuildingStatus } from '../constants/constants';
const router = Router();

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all buildings
 *     description: Retrieve a list of all users
 *     responses:
 *       200:
 *         description: A list of buildings
 *       500:
 *         description: Server error
 */
router.get('/buildings', (req, res) => {
  BuildingData.find({status:BuildingStatus.PRODUCTION},function(err,buildings){
    if (err) {
        console.error("Error occurred while querying buildings:", err);
        return res.status(500).json({ error: "Internal server error" });
    }
    if (buildings && buildings.length > 0) {
        return res.status(200).json({ buildings });
    } else {
        return res.status(200).json({ buildings: [] });
    }
  })
});

/**
 * @swagger
 * /map/{id}:
 *   get:
 *     summary: Get building's map data
 *     description: Retrieve a list of all users
 *     responses:
 *       200:
 *         description: A list of buildings
 *       500:
 *         description: Server error
 */
router.get('/map/:id', (req, res) => {
  const buildingId = req.params.id;
   
});

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
router.post('/navigation/:id', (req, res) => {
  const buildingId = req.params.id;
  const { 
    srcWaypoint,
    checkpointsWaypoints, 
    destWaypoint, 
    isInOrder } = req.body; 

  // if (!validator.isString(name) || validator.isEmpty(name)) {
  //   return res.status(400).json({ error: 'Name must be a non-empty string' });
  // }
  // validator.is
});


/**
 * @swagger
 * /navigation/:id:
 *   get:
 *     summary: Get Building Navigation Data
 *     description: Retrieve a list of all users
 *     responses:
 *       200:
 *         description: A list of buildings
 *       500:
 *         description: Server error
 */
router.get('/navigation/:id', (req, res) => {
  const buildingId = req.params.id;
  const { 
    srcWaypoint,
    checkpointsWaypoints, 
    destWaypoint, 
    isInOrder } = req.body; 

  if (!validator.isString(name) || validator.isEmpty(name)) {
    return res.status(400).json({ error: 'Name must be a non-empty string' });
  }
  validator.is
});



/**
 * @swagger
 * /navigation/:id:
 *   get:
 *     summary: Get Building Navigation Data
 *     description: Retrieve a list of all users
 *     responses:
 *       200:
 *         description: A list of buildings
 *       500:
 *         description: Server error
 */
router.get('/map', (req, res) => {
   
});


/**
 * @swagger
 * /system:
 *   get:
 *     summary: return user system configuration by device.
 *     description: Retrieve a list of all users
 *     responses:
 *       200:
 *         description:
 *       500:
 *         description: Server error
 */
router.post('/system', (req, res) => {
   
});




router.put('/profile', (req, res) => {
   
});
















export default router;

















// router.post('/', (req: Request, res: Response) => {
//     res.send('Login route');
// });
  


/**
 * 
 * /api/users:
 *   get:
 *     summary: Get all users
 *     description: Retrieve a list of all users
 *     parameters:
 *       - name: page
 *         in: query
 *         description: Page number
 *         required: false
 *         schema:
 *           type: integer
 *       - name: limit
 *         in: query
 *         description: Number of items per page
 *         required: false
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       '400':
 *         description: Bad request, invalid parameters
 *       '401':
 *         description: Unauthorized, authentication required
 *       '403':
 *         description: Forbidden, permission denied
 *       '404':
 *         description: Not found, resource not available
 *       '500':
 *         description: Internal server error
 */

/**
 * 
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The user's ID
 *         username:
 *           type: string
 *           description: The user's username
 *         email:
 *           type: string
 *           description: The user's email address
 *       required:
 *         - id
 *         - username
 */
