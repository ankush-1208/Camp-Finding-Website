const express = require('express');
const router = express.Router({ mergeParams: true }); // If you want to have some param that is defined in the router
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn, validateReview, isReviewAuthor } = require('../middleware')
const reviews = require('../controllers/reviews')

// Posting Reviews
router.post('/', isLoggedIn, validateReview, catchAsync(reviews.createReview))

// Deleting Reviews
router.delete('/:reviewId', isLoggedIn, isReviewAuthor, catchAsync(reviews.deleteReview))

module.exports = router;