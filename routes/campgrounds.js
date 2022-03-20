const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn, validateCampground, isAuthor } = require('../middleware')
const campgrounds = require('../controllers/campground')
const multer = require('multer');
const { storage } = require('../cloudinary')
const upload = multer({ storage })
// All campgrounds
router.route('/')
    .get(campgrounds.index)
    // Posting a new campground
    .post(isLoggedIn, upload.array('image', 5), validateCampground, catchAsync(campgrounds.createCampground))

// Form for new campground
router.get('/new', isLoggedIn, campgrounds.newCampForm)

// Getting campground by id
router.route('/:id')
    .get(catchAsync(campgrounds.showCampground))
    // Updating campground
    .put(isLoggedIn, isAuthor, upload.array('image', 5), validateCampground, catchAsync(campgrounds.updateCampground))
    // Deleting campground
    .delete(isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCampground))

// Updation form
router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(campgrounds.updateCampForm))





module.exports = router;