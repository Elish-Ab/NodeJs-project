const express = require('express');
const router = express.Router();
const { isAuthenticated, isAuthor, validateCampground } = require('../middlewares');

const multer = require('multer')
const upload = multer({ dest: 'uploads/' })

const { campgroundSchema } = require('../schemas');

const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');

const Campground = require('../models/campground')

// requiering controllers
const campgrounds = require('../controllers/campgrounds');

// fancy routing 
router.route('/')
    .get(catchAsync(campgrounds.index))
    // .post(isAuthenticated, validateCampground, catchAsync(campgrounds.createCampground))
    .post(upload.single('image'), (req, res) => {
        res.send(req.body, req.file)
    })
router.get('/new', isAuthenticated, campgrounds.renderNewForm);

router.route('/:id')
    .get(catchAsync(campgrounds.showCampground))
    .put(isAuthenticated, isAuthor, validateCampground, catchAsync(campgrounds.updateCampground))
    .delete(isAuthenticated, isAuthor, catchAsync(campgrounds.deleteCampground));

router.get('/:id/edit', isAuthenticated, isAuthor, catchAsync(campgrounds.renderEditForm));


module.exports = router;