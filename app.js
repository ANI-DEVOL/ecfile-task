// app.js
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose'); // Import the MongoDB connection
const cors = require('cors')
app.use(cors())
app.use(bodyParser.json());

const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");
const PORT="8080"
mongoose.connect("mongodb://localhost:27017/bookstore", { useNewUrlParser: true, useUnifiedTopology: true });

const multer = require('multer');
const path = require('path');

app.use('/users', userRoutes);
app.use('/admin', adminRoutes);

// app.get('/', (req, res) => {
//   res.send('Welcome to the main page');
// });


// Define a storage strategy for multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Files will be stored in the 'uploads' directory
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
});

// Create a multer instance with the defined storage strategy
const upload = multer({ storage: storage });

// Define a route for handling file uploads
app.post('/upload', upload.single('file'), (req, res) => {
  // Access uploaded file information
  const uploadedFile = req.file;

  // Send a response to the client (you can customize this based on your needs)
  res.json({status:true,message:'File uploaded successfully!'});
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
