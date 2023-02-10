import { Schema, model  } from "mongoose";

// ****roles existentes
export const ROLES = ["user", "admin", "moderator"]

const roleSchema = new Schema ({
    name: String
}, {
    versionKey: false,
    timestamps: true
});

export default model('Role', roleSchema);