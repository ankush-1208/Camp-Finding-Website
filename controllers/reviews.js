const Review = require('../models/review')
const Campground = require('../models/campground')

module.exports.createReview = async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findById({ _id: id });
    const review = new Review(req.body.review);
    review.author = req.user._id;
    campground.reviews.push(review)
    await review.save();
    await campground.save();
    req.flash('success', 'Review posted')
    res.redirect(`/campgrounds/${campground._id}`);
}

module.exports.deleteReview = async (req, res) => {
    const { id, reviewId } = req.params;
    // We are removing the connection between the reviews and the campgrounds 
    // Using $pull we can pull the review with the id as review id and delete it
    await Campground.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete({ _id: reviewId })
    req.flash('success', 'Review deleted')
    res.redirect(`/campgrounds/${id}`);
}