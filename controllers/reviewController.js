const Review = require('../models/reviewModel');

exports.createReview = async (req, res) => {
  try {
    const review = await Review.create({
      ...req.body,
      book: req.params.id, // in the review collection stores the book id, user id , to know who and for which book review is being created.
      user: req.user.id
    });
    res.status(201).json(review);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateReview = async (req, res) => {
  try {
    const review = await Review.findOneAndUpdate( // to match review id, and user id
      { _id: req.params.id, user: req.user.id },
      req.body,
      { new: true }
    );
    if (!review) return res.status(404).json({ message: "Review not found or unauthorized" }); //if no match then request denied
    res.json(review); // review is updated
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteReview = async (req, res) => {
  try {
    const review = await Review.findOneAndDelete({ // matching the user id and review id
      _id: req.params.id,
      user: req.user.id
    });
    if (!review) return res.status(404).json({ message: "Not found or unauthorized" }); // if not matched, request denied.
    res.json({ message: "Review deleted" }); // when matched, using  findOneAndDelete(), review is deleted 
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
