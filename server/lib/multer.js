import multer from "multer";

// diskStorage({}) → tells Multer to store files temporarily on disk (default path) of server.
//if running in localhoset:3000 it gets stored in computers hardrive 
//if running in hosted servers , ex vercel ; it gets stored in that disk of that server, not your computer.
//we can also store it  in localstorage instead , where we dont need to point to the path of the file, where we need to use 
// req.file.buffer

// upload is now a middleware function you can use in your routes
const storage = multer.diskStorage({});
const upload = multer({ storage });

export default upload;


// But why to get path or buffer?
// ANS: Cloudinary cannot directly take a File object from the browser in Node; it expects a file path or buffer/stream.
// So you need to convert the File object to a buffer first, then call Cloudinary’s upload_stream. 