const jwt = require("jsonwebtoken")
exports.authenticate = (req, res,next) =>{
    const authenticate = req.headers['authenticate'];
    const token = authenticate && authenticate.split(' ')[1]
    if(token==null){
        return res.status(401).json({"message":"token not found"})
    }
    jwt.verify(token,process.env.ACCESS_TOKEN, (err, data) => {
        if (err)
            return res.status(403).json({"message": err.message || "token not verified"})
        req.id = data.id
        req.role = data.role;
        console.log(data)
        next()
   })
}