import HttpError from "./http-error";

class NotFoundError extends HttpError{
    constructor(message: string){
        const statusCode = 404;
        super(message,statusCode);
    }
}
export default NotFoundError;