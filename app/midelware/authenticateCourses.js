exports.authenticate = (req, res,next) =>{
    if(req.role!=="manager" && req.role!=="student" && req.role!=="professor")
        return res.status(403).json({"message":"access denied"})
    next()
}