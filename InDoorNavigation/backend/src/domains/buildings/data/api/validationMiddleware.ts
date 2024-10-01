
// import { Request, Response, NextFunction } from 'express';
// import { check, param } from 'express-validator';
// import { buildingService } from '../services/buildingService'; // Adjust path as per your project structure



// export const validateBuildingId = [
//     // Validate buildingId parameter
//     param('buildingId').custom(async (value: string) => {
//         const building = await buildingService.getBuildingById(value);
//         if (!building) {
//             throw new Error('Building not found');
//         }
//         return true;
//     }),

//     // Custom error handler for validation errors
//     (req: Request, res: Response, next: NextFunction) => {
//         const errors = validationResult(req);
//         if (!errors.isEmpty()) {
//             return res.status(404).json({ errors: errors.array() });
//         }
//         next();
//     }
// ];

