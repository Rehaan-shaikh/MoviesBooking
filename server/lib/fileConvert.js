///No need for this as we r using multer with cloudinary instance
// import cloudinary from "./cloudinary";
// export async function uploadImage(file) {
//   if (!file || file.size === 0) return null;

//   // ✅ Validate image type
//   if (!file.type.startsWith("image/")) {
//     throw new Error("Only image files are allowed!");
//   }

//   const arrayBuffer = await file.arrayBuffer();
//   const buffer = Buffer.from(arrayBuffer);

//   const uploadRes = await new Promise((resolve, reject) => {
//     cloudinary.uploader
//       .upload_stream(
//         {
//           resource_type: "image",
//           folder: "complaints",
//         },
//         (error, result) => {
//           if (error) reject(error);
//           else resolve(result);
//         }
//       )
//       .end(buffer);
//   });

//   return {
//     url: uploadRes.secure_url,
//     public_id: uploadRes.public_id,
//   };
// }
