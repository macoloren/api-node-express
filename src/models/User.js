import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Schema ({
    username: {
        type: String,
        required: true
    },
    email:{
        type: String,
        unique: true,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    // relacionando del schema Role  
    roles: [{
        ref: "Role",
        type: Schema.Types.ObjectId
    }]
}, {
    timestamps: true,
    versionKey: false
});

//metodo para cifrar password
userSchema.statics.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(password, salt)
}

//metodo para comparar password cifrada con password plana
userSchema.statics.comparePassword = async (password, receivedPassword) => {
    return await bcrypt.compare(password, receivedPassword)
}

export default model ('Users', userSchema)
