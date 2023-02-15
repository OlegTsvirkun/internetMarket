class ApiErrors extends Error{
    constructor(status,message){
        super();
        this.status = status;
        this.message = message;
    }
    static badRequest(message){
        return new ApiErrors(400,message)
    }
    static notFound(message){
        return new ApiErrors(404,message)
    }
    static forbidden (message){
        return new ApiErrors(403,message)
    }
    static internal(message){
        return new ApiErrors(500,message)
    }
}
module.exports = ApiErrors

