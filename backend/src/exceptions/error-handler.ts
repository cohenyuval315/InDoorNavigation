import { Request, Response, NextFunction } from 'express';
import NoValidPathError from './no-valid-path-error';
import ValidationError from './validation-error';
import NotFoundError from './not-found-error';

const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof NoValidPathError) {
        return res.status(404).json({ error: err.message });
    } else if (err instanceof ValidationError) {
        return res.status(400).json({ error: err.message });
    } else if (err instanceof NotFoundError) {
        return res.status(404).json({ error: err.message });
    }else{

    }
  console.error(err.stack); // Log the stack trace for debugging
  res.status(500).json({ error: 'Internal Server Error' });
};

export default errorHandler;

