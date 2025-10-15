import mongoose from 'mongoose';

const foodSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  image: { type: String }, // URL of the food image
  price: { type: Number, required: true },
}, { timestamps: true });

const Food = mongoose.model("Food", foodSchema);
export default Food;
