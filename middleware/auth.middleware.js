const config =require('config');
const jwt =require('jsonwebtoken');

module.exports=function(req, res, next){
    const token=req.header("x-auth-token");
    if(!token)
    res.status(401).send("Access denied : Unauthoried");
    try{
        const decoded=jwt.verify(token, config.get('jwtPrivatekey'));
        req.user=decoded;
        console.log("Decoded value" + req.emp);
        next();
    }
    catch(e){
        res.status(400).send("invalid token");
    }
}