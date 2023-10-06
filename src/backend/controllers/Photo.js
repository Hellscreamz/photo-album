const { Photo } = require('../models');
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage });
const jwt = require('jsonwebtoken');

exports.uploadPhotoAndCreateEntry = async (req, res) => {
  try {

    const token = req.headers.authorization.split(' ')[1]; // Assuming "Bearer" is part of the token value

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    const userId = decodedToken.userId;

    const photoCount = await Photo.count({ where: { userId } });

    if (photoCount >= 10) {
      return res.status(400).json({ error: 'You have reached the maximum limit of 10 photos.' });
    }

    const { title, description, place } = req.body;

    upload.single('photo')(req, res, async function (err) {
      if (err) {
        return res.status(400).json({ error: 'File upload failed.' });
      }

      const imageData = req.file.buffer;

      const photo = await Photo.create({
        title,
        description,
        place,
        userId,
        imageData,
      });

      res.status(201).json({ message: 'Photo uploaded and entry created successfully', photo });
    });
  } catch (error) {
    console.error('Error creating photo entry:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
