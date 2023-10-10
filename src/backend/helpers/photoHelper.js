const { Photo, Comment } = require('../models');
const decodeToken = require('../utils/decodeToken');

const multer = require('multer');
const upload = multer();

async function uploadPhotoAndCreateEntry(token, req) {
  const userId = await decodeToken.extractUserIdFromToken(token);

  const photoCount = await Photo.count({ where: { userId } });

  if (photoCount >= 10) {
    throw new Error('You have reached the maximum limit of 10 photos.');
  }

  return new Promise((resolve, reject) => {
    upload.single('photo')(req, {}, async function (err) {
      if (err) {
        reject(new Error('File upload failed.'));
      } else {
        const imageData = req.file.buffer;

        try {
          const photo = await Photo.create({
            userId,
            imageData,
          });

          resolve({ message: 'Photo uploaded and entry created successfully', photo });
        } catch (error) {
          reject(error);
        }
      }
    });
  });
}

async function getLastTenPhotos() {
  const photos = await Photo.findAll({
    limit: 10,
    order: [['createdAt', 'DESC']],
  });

  return photos.map((photo) => {
    const imageBuffer = photo.imageData; // imageData is binary data
    const base64Image = imageBuffer.toString('base64');
    return {
      id: photo.id,
      imageData: `data:image/jpeg;base64,${base64Image}`,
    };
  });
}

async function getAllPictures(page) {
  const itemsPerPage = 10;
  const offset = (page - 1) * itemsPerPage;

  const { count, rows } = await Photo.findAndCountAll({
    offset,
    limit: itemsPerPage,
    order: [['createdAt', 'DESC']],
    include: [{ model: Comment }],
  });

  const totalPages = Math.ceil(count / itemsPerPage);

  return {
    pictures: rows.map((photo) => {
      const imageBuffer = photo.imageData;
      const base64Image = imageBuffer.toString('base64');
      return {
        id: photo.id,
        imageData: `data:image/jpeg;base64,${base64Image}`,
        comments: photo.Comments.map((comment) => ({
          id: comment.id,
          text: comment.text,
        })),
      };
    }),
    totalPages,
  };
}

async function deletePhoto(token, photoId) {
  const userId = await decodeToken.extractUserIdFromToken(token);

  const photo = await Photo.findOne({ where: { id: photoId } });

  if (!photo) {
    throw new Error('Photo not found');
  }

  if (photo.userId !== userId) {
    throw new Error('You do not have permission to delete this photo');
  }

  await photo.destroy();
}

async function submitComment(token, photoId, commentText) {
  const userId = await decodeToken.extractUserIdFromToken(token);

  const photo = await Photo.findOne({ where: { id: photoId } });

  if (!photo) {
    throw new Error('Photo not found');
  }

  const comment = await Comment.create({
    userId,
    photoId,
    text: commentText,
  });

  return comment;
}

async function getCommentsByPhotoIds(photoIds) {
  const photoIdsArray = photoIds.split(',');

  return Comment.findAll({
    where: { photoId: photoIdsArray },
    include: Photo,
  });
}

module.exports = {
  uploadPhotoAndCreateEntry,
  getLastTenPhotos,
  getAllPictures,
  deletePhoto,
  submitComment,
  getCommentsByPhotoIds,
};
