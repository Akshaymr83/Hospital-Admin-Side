const express = require('express');
const app = express();
const port = 4000;
const mongoose = require('mongoose');
const cors = require('cors');
const userModel = require('./models/users');
const multer = require('multer');
const path = require('path');

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

mongoose.connect('mongodb://localhost:27017/hospital')
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images');
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

app.post("/post", async (req, res) => {
  try {
    const { name, age, email, image, description, department } = req.body;
    const user = await userModel.create({ name, age, email, image, description, department });
    res.json(user);
  } catch (err) {
    console.error("Error in POST /post:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get('/get', async (req, res) => {
  try {
    const users = await userModel.find();
    res.json(users);
  } catch (err) {
    console.error("Error in GET /get:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post('/upload', upload.single('file'), (req, res) => {
    userModel.create({ image: req.file.filename })
        .then(result => {
            console.log(req.file);
            res.json(result); // Send JSON response after creating the image record
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err.message }); // Send error response with status code 500
        });
});


app.get('/getimage',(req,res)=>{
    userModel.find()
    .then(image => res.json(image))
    .catch(err => res.json(err))
})


// app.post('/upload', (req, res) => {
//     upload.single('image')(req, res, function (err) {
//       if (err instanceof multer.MulterError) {
//         // A Multer error occurred (e.g. file size limit exceeded)
//         console.error("Multer error:", err);
//         return res.status(400).json({ error: "File upload error", message: err.message });
//       } else if (err) {
//         // An unknown error occurred during file upload
//         console.error("Unknown error during file upload:", err);
//         return res.status(500).json({ error: "Internal Server Error" });
//       }
  
//       // File upload successful, send response with uploaded file information
//       if (!req.file) {
//         return res.status(400).json({ error: "No file uploaded" });
//       }
//       res.json({ filename: req.file.filename });
//     });
//   });
  

app.listen(port, () => {
  console.log("Server is running on port", port);
});
