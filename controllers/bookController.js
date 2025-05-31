const Book = require('../models/bookModel');
const Review = require('../models/reviewModel');

exports.createBook = async (req, res) => {
  try {
    const book = await Book.create({ ...req.body, createdBy: req.user.id });
    res.status(201).json(book);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getBooks = async (req, res) => {
  const { author, genre, page = 1, limit = 10 } = req.query;
  const filter = {};
  if (author) filter.author = new RegExp(author, 'i');
  if (genre) filter.genre = new RegExp(genre, 'i');

  try {
    const books = await Book.find(filter)
      .skip((page - 1) * limit)
      .limit(parseInt(limit));
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getBookDetails = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    const reviews = await Review.find({ book: book._id })
      .populate('user', 'username')
      .limit(10);

    const avgRating = await Review.aggregate([
      { $match: { book: book._id } },
      { $group: { _id: null, avg: { $avg: "$rating" } } }
    ]);

    res.json({
      book,
      averageRating: avgRating[0]?.avg || 0,
      reviews
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
