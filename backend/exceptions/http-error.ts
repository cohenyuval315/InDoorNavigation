class HttpError extends Error {
    public statusCode: number;
    
    constructor(message: string, statusCode: number) {
        super(message);
        this.statusCode = statusCode;
        this.name = "HttpError"
        Object.setPrototypeOf(this, new.target.prototype);
    }
}

export default HttpError;