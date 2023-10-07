const express = require('express');
const app = express();
const cors = require('cors');
const port = 3000;
const userController = require('../controllers/User');
const photoController = require('../controllers/Photo');
const contactsController = require('../controllers/Contacts');
const adminController = require('../controllers/Admin');

const corsOptions = {
  origin: 'http://localhost:3001', // Replace with your frontend's URL
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
};
app.use(cors(corsOptions));

app.use(express.json());

app.post('/create-user', userController.createUser);

app.post('/upload-photo', photoController.uploadPhotoAndCreateEntry);

app.post('/login-user', userController.loginUser);

app.get('/get-last-ten-photos', photoController.getLastTenPhotos);

app.get('/get-all-pictures', photoController.getAllPictures);

app.delete('/delete-photo/:photoId', photoController.deletePhoto);

app.post('/submit-comment/:photoId', photoController.submitComment);

app.get('/get-comments', photoController.getCommentsByPhotoIds);

app.get('/get-users', userController.getAllUsersWithPagination);

app.post('/send-message', contactsController.submitMessage);

app.post('/create-admin', adminController.createAdmin);

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
