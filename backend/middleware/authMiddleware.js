const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

exports.protect = asyncHandler(async (req, res, next) => {

    const token = req.cookies;
    console.log(req.cookies);


    if (!token || token == undefined) {
        res.status(401)
        throw new Error('Not authrized')
    }

    try {

        const decodedData = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decodedData.id);
        next();
    } catch (error) {
        console.error(error)
        res.status(401)
        throw new Error('Not authrized,token')
    }


});