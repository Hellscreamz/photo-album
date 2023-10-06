const { Photo, Comment } = require('../models');
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

    upload.single('photo')(req, res, async function (err) {
      if (err) {
        return res.status(400).json({ error: 'File upload failed.' });
      }

      const imageData = req.file.buffer;

      const photo = await Photo.create({
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

exports.getLastTenPhotos = async (req, res) => {
  try {
    const photos = await Photo.findAll({
      limit: 10,
      order: [['createdAt', 'DESC']],
    });

    const photosWithBase64 = photos.map((photo) => {
      const imageBuffer = photo.imageData; // imageData is binary data
      const base64Image = imageBuffer.toString('base64');
      return {
        id: photo.id,
        imageData: `data:image/jpeg;base64,${base64Image}`,
      };
    });

    res.json(photosWithBase64);
  } catch (error) {
    console.error('Error fetching photos:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


exports.getAllPictures = async (req, res) => {
  try {
    const { page } = req.query;
    const itemsPerPage = 10;
    const offset = (page - 1) * itemsPerPage;

    const { count, rows } = await Photo.findAndCountAll({
      offset,
      limit: itemsPerPage,
      order: [['createdAt', 'DESC']],
    });

    const totalPages = Math.ceil(count / itemsPerPage);

    const photosWithBase64 = rows.map((photo) => {
      const imageBuffer = photo.imageData;
      const base64Image = imageBuffer.toString('base64');
      return {
        id: photo.id,
        // Add other properties as needed
        imageData: `data:image/jpeg;base64,${base64Image}`,
      };
    });

    res.status(200).json({
      pictures: photosWithBase64,
      totalPages,
    });
  } catch (error) {
    console.error('Error fetching pictures:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.deletePhoto = async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decodedToken.userId;
    const photoId = req.params.photoId;

    const photo = await Photo.findOne({ where: { id: photoId } });

    if (!photo) {
      return res.status(404).json({ error: 'Photo not found' });
    }

    if (photo.userId !== userId) {
      return res.status(403).json({ error: 'You do not have permission to delete this photo' });
    }

    await photo.destroy();

    res.status(204).send();
  } catch (error) {
    console.error('Error deleting photo:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.submitComment = async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decodedToken.userId;
    const photoId = req.params.photoId;
    const commentText = req.body.commentText;

    const photo = await Photo.findOne({ where: { id: photoId } });

    if (!photo) {
      return res.status(404).json({ error: 'Photo not found' });
    }

    const comment = await Comment.create({
      userId,
      photoId,
      text: commentText,
    });

    res.status(201).json({ message: 'Comment submitted successfully', comment });
  } catch (error) {
    console.error('Error submitting comment:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};