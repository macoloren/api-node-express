import User from "../models/User";
import jwt from "jsonwebtoken";
import config from "../config";
import Role from "../models/Role";


//****Register
export const signup = async (req, res) => {
    const { username, email, password, roles } = req.body
    const newUser = new User({
        username,
        email,
        password: await User.encryptPassword(password)
    });

    //****validando password
    const validatePasword = req.body.password
    if (!/[a-z]/.test(validatePasword) || !/[A-Z]/.test(validatePasword) || !/[0-9]/.test(validatePasword) || validatePasword.length < 7) {
        return res.json({message: "El campo 'Contraseña' no es correcto. Es obligatorio, de mínimo 7 caracteres, y debe contener una mayúscula, una minúscula y un dígito numerico"});
    }

    //****manejo de roles
    if (roles){
    const foundRoles = await Role.find({ name: { $in: roles } })

    //sino envia un rol coloca rol user por defecto
    newUser.roles = foundRoles.map(role => role._id)
    } else {
        const role = await Role.findOne({name: "user"})
        newUser.roles = [role._id]
    };
    const savedUser = await newUser.save();

    //****usando jwt
    const token = jwt.sign({ id: savedUser._id }, config.SECRET, {
        expiresIn: 86400 //24hrs
    });
    res.status(201).json({ message: "Signup successfully", token })
};



//****login
export const signin = async (req, res) => {
    const userFound = await User.findOne({email: req.body.email}).populate("roles")
    //****validando usuario
    if (!userFound) return res.status(400).json({ message: "User not Foud"})

    //****comparando password plana con password hasheada
    const matchPassword = await User.comparePassword(req.body.password, userFound.password)
    if (!matchPassword) return res.status(401).json({token: null, message: "Invalid Password" })

    //****usando jwt
    const token = jwt.sign({ id: userFound._id }, config.SECRET, {
        expiresIn:86400 //24hrs
    });
    res.status(200).json({message: "Signin successfully", token})
};


