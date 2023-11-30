module.exports = (errorMesage, status, statusCode, next) =>{
    const err = new Error(errorMesage);
    err.status = status;
    err.statusCode = statusCode;
    return next(err);
}