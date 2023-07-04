const Campground = require('../models/campground')

module.exports.index = async(req, res, next) => {
    const campgrounds = await Campground.find({})
    res.render('campgrounds/index', { campgrounds })
}

module.exports.renderNewForm = (req, res) => {
    res.render('campgrounds/new');
}

module.exports.createCamaground = async(req, res, next) => {
    const campground = new Campground(req.body.campground);
    campground.author = req.user._id;
    await campground.save();
    req.flash('success', 'You have made new C.ground')
    res.redirect(`/campgrounds/${campground._id}`);
}

module.exports.showCampground = async(req, res) => {
    const campground = await Campground.findById(req.params.id).populate('reviews').populate('author');
    console.log(campground)
    if (!campground) {
        req.flash('error', 'This cpmpground not found');
        return res.redirect('/campgrounds')
    }
    res.render('campgrounds/show', { campground });
}

module.exports.renderEditForm = async(req, res) => {
    const { id } = req.params;
    const campground = await Campground.findById(id)
    if (!campground) {
        req.flash('error', 'can not find that campground');
        return res.redirect('/campgrounds');
    }
    res.render('campgrounds/edit', { campground })
}

module.exports.updateCampground = async(req, res) => {
    const { id } = req.params;
    const campground = await Campground.findByIdAndUpdate(id, {...req.body.campground });
    req.flash('success', 'Updated Successfully')
    res.redirect(`/campgrounds/${campground._id}`);

}

module.exports.deleteCampground = async(req, res) => {
    const { id } = req.params;
    await Campground.findByIdAndDelete(id);
    req.flash('success', 'The Campground Deleted Successfully')
    res.redirect('/campgrounds')
}