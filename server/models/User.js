import mongoose from "mongoose";
//Mongoose is uused to definne schema and models
const userSchema = new mongoose.Schema({
    // _id: {type: String, required: true},  mongo db automatically creates _id
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    role: {type: String, enum: ['user', 'admin'], default: 'user'},
    image: {type: String},
})

const User = mongoose.model("User", userSchema); //User is the name of the collection in db but it  converts to lowercase and gets pluralized
//ie User -> becomus -> users
export default User;