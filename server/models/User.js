import mongoose from "mongoose";
//Mongoose is uused to definne schema and models

const userSchema = new mongoose.Schema({
  //_id: {type: String, required: true},  mongo db automatically creates _id
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["user", "admin"], default: "user" },
  image: { type: String },
  favourites: [{ type: mongoose.Schema.Types.ObjectId, ref: "Movie" }], 
  // 'favourites' is an array of ObjectIds referencing Movie documents
  //It is done by wrapping it in []
});

const User = mongoose.model("User", userSchema);
export default User;


//dummmy visualization
// {
//   _id: ObjectId("652a9ffae45a1234567890a1"),
//   name: "Rehan Shaikh",
//   email: "rehan@email.com",
//   password: "hashedpassword",
//   role: "user",
//   image: "https://example.com/avatar.jpg",
//   favourites: [
//     ObjectId("652aa123e45a1234567890b1"), // refers to movie m1
//     ObjectId("652aa123e45a1234567890b2"), // refers to movie m2
//     ObjectId("652aa123e45a1234567890b3")  // refers to movie m3
//   ]
// }
