const express = require('express');
const router = express.Router();
const photoController = require('../controllers/Photo');

router.post('/upload-photo', photoController.uploadPhotoAndCreateEntry);
router.get('/get-last-ten-photos', photoController.getLastTenPhotos);
router.get('/get-all-pictures', photoController.getAllPictures);
router.delete('/delete-photo/:photoId', photoController.deletePhoto);
router.post('/submit-comment/:photoId', photoController.submitComment);
router.get('/get-comments', photoController.getCommentsByPhotoIds);

module.exports = router;
