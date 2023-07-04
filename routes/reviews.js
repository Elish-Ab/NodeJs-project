const express = require('express');
const router = express.Router({ mergeParams: true });
const { isAuthenticated, isAuthor, validateReview, isReviewAuthor } = require('../middlewares')

// review controller
const reviews = require('../controllers/reviews')

const Campground = require('../models/campground');
const Review = require('../models/review.js');

const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');

router.post('/', isAuthenticated, isAuthor, validateReview, catchAsync(reviews.createReview));

router.delete('/:reviewId', isAuthenticated, isReviewAuthor, catchAsync(reviews.deleteReview));

module.exports = router;