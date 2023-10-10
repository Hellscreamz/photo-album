const photoHelper = require('../helpers/photoHelper');

exports.uploadPhotoAndCreateEntry = async (req, res) => {
  try {
    const resultUpload = await photoHelper.uploadPhotoAndCreateEntry(req.headers.authorization.split(' ')[1], req);
    res.status(201).json(resultUpload);
  } catch (error) {
    console.error('Error creating photo entry:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getLastTenPhotos = async (req, res) => {
  try {
    const photos = await photoHelper.getLastTenPhotos();
    res.json(photos);
  } catch (error) {
    console.error('Error fetching photos:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getAllPictures = async (req, res) => {
  try {
    const { page } = req.query;
    const photos = await photoHelper.getAllPictures(page);
    res.json(photos);
  } catch (error) {
    console.error('Error fetching pictures:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.deletePhoto = async (req, res) => {
  try {
    await photoHelper.deletePhoto(req.headers.authorization.split(' ')[1], req.params.photoId);
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting photo:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.submitComment = async (req, res) => {
  try {
    const comment = await photoHelper.submitComment(req.headers.authorization.split(' ')[1], req.params.photoId, req.body.commentText);
    res.status(201).json({ message: 'Comment submitted successfully', comment });
  } catch (error) {
    console.error('Error submitting comment:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getCommentsByPhotoIds = async (req, res) => {
  try {
    const comments = await photoHelper.getCommentsByPhotoIds(req.query.photoIds);
    res.status(200).json(comments);
  } catch (error) {
    console.error('Error fetching comments:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
