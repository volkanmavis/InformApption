const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next)=>{
    const headers = req.headers.authorization;
    let clientToken = headers.split('')[1]
    let verifiedToken = jwt.verify(clientToken, "fenerbahce")

    if(!verifiedToken){
        return res.status(401).send({msg: "invalid token, unauthorized"})
    }else{
        req.user = verifiedToken
        next();
    }

}

module.exports = verifyToken