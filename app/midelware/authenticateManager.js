exports.authenticate = (req, res,next) =>{
    if(req.role!=="manager")
        return res.status(403).json({"message":"access denied"})
    next()
}