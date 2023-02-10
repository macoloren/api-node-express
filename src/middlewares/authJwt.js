import jwt from "jsonwebtoken";
import config from "../config";
import User from "../models/User";
import Role from "../models/Role";


//***comprobar que exista un token (con Role) en el headers (cabecera)
export const verifyToken = async (req, res, next) => {
    try {
        const token = req.headers["x-acces-token"]

        //verificando que exista un token en el headers
        if (!token) return res.status(403).json({ message: "No token provided" })

        //decodificando el user del token
        const decoded = jwt.verify(token, config.SECRET)
        req.userId = decoded.id //setieando al req propiedad decode.id 

        //cuando es un token valido pero ya no existe en la db
        const user = await User.findById(req.userId, { password: 0 })
        if (!user) return res.status(404).json({ message: "User no found" })
        next();
    } catch (error) {
        return res.status(401).json({ message: "unauthorized" })
    }
};



//!MANEJO DE ROLES PARA TENER PERMISO QUE RUTAS PODER CONSUMIR
//****MANEJO DE ROL MODERATOR
export const isModerator = async (req, res, next) => {
    const user = await User.findById(req.userId);
    const roles = await Role.find({ _id: { $in: user.roles } });

    // recorriendo el arreglo de roles para verificar que rol tiene
    for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "moderator") {
            next();
            return
        };
    };
    return res.status(403).json({message: "Require Moderator Role"})
};


//****MANEJO DE ROL ADMIN
export const isAdmin = async (req, res, next) => {
    const user = await User.findById(req.userId);
    const roles = await Role.find({ _id: { $in: user.roles } });

    // recorriendo el arreglo de roles para verificar que rol tiene
    for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "admin") {
            next();
            return
        };
    };
    return res.status(403).json({message: "Require Admin Role"})
};


