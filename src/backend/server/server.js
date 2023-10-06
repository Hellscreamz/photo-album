const express = require('express');
const app = express();
const cors = require('cors');
const port = 3000;
const userController = require('../controllers/User');
const photoController = require('../controllers/Photo');

const corsOptions = {
  origin: 'http://localhost:3001', // Replace with your frontend's URL
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
};
app.use(cors(corsOptions));

app.use(express.json());

app.post('/create-user', userController.createUser);

app.post('/upload-photo', photoController.uploadPhotoAndCreateEntry);

app.post('/login-user', userController.loginUser);

// New route to fetch the last 10 photos
app.get('/get-last-ten-photos', photoController.getLastTenPhotos);

// New route to fetch all pictures with pagination
app.get('/get-all-pictures', photoController.getAllPictures);

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
