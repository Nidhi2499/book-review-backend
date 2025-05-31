const Review = require('../models/reviewModel');

exports.createReview = async (req, res) => {
  try {
    const review = await Review.create({
      ...req.body,
      book: req.params.id,
      user: req.user.id
    });
    res.status(201).json(review);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateReview = async (req, res) => {
  try {
    const review = await Review.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      { new: true }
    );
    if (!review) return res.status(404).json({ message: "Review not found or unauthorized" });
    res.json(review);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteReview = async (req, res) => {
  try {
    const review = await Review.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id
    });
    if (!review) return res.status(404).json({ message: "Not found or unauthorized" });
    res.json({ message: "Review deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
