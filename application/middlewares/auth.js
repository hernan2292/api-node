const jwt = require('jsonwebtoken');

// =================
// Token verify
// =================

let tokenVerify = ( req , res , next ) => {
    let token = req.get('Authorization')

    jwt.verify( token, process.env.TOKEN_SEED, ( err, decoded) => {

        if (err) {
            return res.status(401).json({
                ok:false,
                err :{
                    message: 'Invalid authorization'
                }
            })
        }

        req.user = decoded.user

    })

    next()

}

// =================
// Admin role verify
// =================

let adminRoleVerify = ( req , res , next ) => {
    let user = req.user

    if (user.role != 'ADMIN_ROLE') {
        return res.status(405).json({
            ok:false,
            err :{
                message: 'Not allowed operation, insufficient permissions.'
            }
        })
    }
    
    next()

}

module.exports = {
    tokenVerify,
    adminRoleVerify
}