const OrderQueries = require("../../db/queries/orderQueries/orderQueries")
const sendError = require('../../errors/sendError');


exports.deleteOrder = (req,res,next)=>{
    const rootId = req.body.rootId;
    OrderQueries.deleteOrder(rootId)
    .then((result)=>{
        res.status(201).json({
            status: "success",
            msg: `${rootId} - Deleted Successfully`,
        });
    })
    .catch(err=>{
        sendError("Something Went Wrong - Order Couldn't Deleted", "fail", 500, next);
    });
}