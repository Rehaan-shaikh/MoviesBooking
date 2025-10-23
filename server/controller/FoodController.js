import Food from "../models/Food.js";
import cloudinary from "../lib/cloudinary.js";

// 🧑‍🍳 Add a new food item (Admin)
export const addFood = async (req, res) => {
  try {
    const { name, description, price } = req.body;
    console.log(name , description , price);
    console.log(req.file);
    

    if (!name || !price)
      return res.status(400).json({ success: false, message: "Name and price are required." });


    //REFER the last que of the chat :https://chatgpt.com/share/68efb720-9b9c-8007-acf4-0065adb46d5b
    //to understand the diff between using cloudinary in next js with server actions and with express with multer middleware
    let imageUrl = "";
    if (req.file) {
      //cloudinary.uploader.upload() :This uploads the file to Cloudinary and returns public url of that file
      //req.file.path is the temporary path of the file on your server (set by Multer) it has to be the same path.
      //cause multer has saved the file in your diskstorage with this path
      //{ folder: "foods" } tells Cloudinary to store this image inside the "foods" folder in your Cloudinary account.
      const uploadRes = await cloudinary.uploader.upload(req.file.path, { folder: "foods" });
      imageUrl = uploadRes.secure_url;
    }

    //new Foof({}) is other way of creating document
    // new Food creates an mongoose instance , which can be Explicit modified before saving
    // like this :
    const newFood = new Food({ name, description, image: imageUrl, price });
    // if(!imageUrl) newFood.image = "default.png";   //like this we can modify before saving
    await newFood.save();

    res.status(201).json({ success: true, message: "Food item added successfully.", food: newFood });
  } catch (error) {
    console.error("Error adding food:", error);
    res.status(500).json({ success: false, message: "Server error while adding food." });
  }
};


// 🍔 Get all food items
export const getAllFoods = async (req, res) => {
  try {
    const foods = await Food.find().sort({ createdAt: -1 }); // newest first

    res.status(200).json({
      success: true,
      foods,
    });
  } catch (error) {
    console.error("Error fetching foods:", error);
    res.status(500).json({ success: false, message: "Server error while fetching foods." });
  }
};
