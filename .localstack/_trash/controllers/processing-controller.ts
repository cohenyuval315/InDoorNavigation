// import {Request,Response,NextFunction} from 'express'
// import * as processingService from '../services/processing-service';


// export const uploadProcessingMap = async (req:Request,res:Response,next:NextFunction) => {
//     try {
//         const buildingId = req.params.buildingId;
//         const body = req.body
//         const data = body.data;
//         const version = data['version'];
//         const processingMap = await processingService.getProcessingMap(buildingId,version)
//         if (processingMap){
//             res.status(409).json({ message: 'procesisng map exists already' });
//             return;
//         }

//         const response = await processingService.uploadProcessingMap(data);
//         const map = await processingService.getProcessingMap(buildingId,version)

//         if (map){
//             res.status(201).json({ message: 'map uploaded successfully' });
//         }else{
//             res.status(500).json({ message: 'internal server error' });
//         }
        
//     }catch(error){
//         console.log(error)
//         next(error);
//     }
// }
// export const getProcessingMap = async (req:Request,res:Response,next:NextFunction) => {
//     try {
//         const buildingId = req.params.buildingId;
//         const version = req.params.version;
//         const map = await processingService.getProcessingMap(buildingId,version)
//         console.log(`Map: ${JSON.stringify(map)}`); // Log the map
//         if(map){
//             res.status(200).json({ data: map });
//         }else{
//             res.status(404).json({ message: 'map not found' });
//         }
//     }catch(error){
//         next(error);
//     }
// }

// export const uploadRoute = async (req:Request,res:Response,next:NextFunction) => {
//     try {
//         const buildingId = req.params.buildingId;
//         const body = req.body
//         const data = body.data;
//         const routeName = data.routeName;
//         const existingRoute = await processingService.getRouteByName(buildingId,routeName)
//         if (existingRoute){
//             res.status(409).send('route exists')
//             return;
//         }
//         const response = await processingService.uploadRoute(data);
//         console.log("upload response = ",response)
//         const route = await processingService.getRouteByName(buildingId,routeName)
//         console.log("new route:?",route)
//         if (route){
//             res.status(201).json({ message: 'Route uploaded successfully' });
//         }else{
//             res.status(500).json({ message: 'internal server error' });
//         }
        
//     }catch(error){
//         console.log(error);
//         next(error);
//     }
// }

// export const getAllRoutes = async (req:Request,res:Response,next:NextFunction) => {
//     try {
//         const buildingId = req.params.buildingId;
//         const routes = await processingService.getAllRoutes(buildingId)
//         res.status(200).json({ data: routes });
//     }catch(error){
//         next(error);
//     }
// }    

// export const getAllRoutesTitles = async (req:Request,res:Response,next:NextFunction) => {
//     try {
//         const buildingId = req.params.buildingId;
//         const routesTitles = await processingService.getAllRoutesTitles(buildingId)
//         res.status(200).json({ data: routesTitles });
//     }catch(error){
//         next(error);
//     }
// }    


// export const getRouteByName = async (req:Request,res:Response,next:NextFunction) => {
//     try {
//         const buildingId = req.params.buildingId;
//         const routeName = req.params.routeName;
        
//         const route = await processingService.getRouteByName(buildingId,routeName)

//         if(route){
//             res.status(200).json({ data: route });
//         }else{
//             res.status(404).json({ message: 'Route not found' });
//         }
//     }catch(error){
//         next(error);
//     }
// }

// export const getAllProcessingMaps = async (req:Request,res:Response,next:NextFunction) => {
//     try {
//         const buildingId = req.params.buildingId;
//         const processingData = await processingService.getAllProcessingMaps(buildingId)
//         res.status(200).json({ data: processingData });
//     }catch(error){
//         next(error);
//     }
// }