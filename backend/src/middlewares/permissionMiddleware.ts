import { NextFunction,Request,Response } from "express";

export const isPermitted = (req: Request, res: Response, next: NextFunction) => {
    next();
};

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
    next();
};