const Role=require("./role_model");


const checkPermission = (permission) => {
    return async (req, res, next) => {
        const user = req.user;
        const userRoles = await Role.find({ '_id': { $in: user.roles } });
        console.log("user_roles");
        const hasPermission = userRoles.some(role => 
            role.permissions.includes(permission)
        );
        console.log(hasPermission);
        if (!hasPermission) {
            console.log("not enough permissions")
            return res.status(403).send({ error: 'Insufficient permissions' });
        }

        next();
    };
};

module.exports=checkPermission;