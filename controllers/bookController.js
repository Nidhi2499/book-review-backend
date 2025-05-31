const Book = require('../models/bookModel');
const Review = require('../models/reviewModel');

exports.createBook = async (req, res) => {
  try {
    const book = await Book.create({ ...req.body, createdBy: req.user.id }); // whatever is passed in the request body is added to the db
    res.status(201).json(book);
  } catch (err) {
    res.status(500).json({ error: err.message }); // if not created then this message is displayed
  }
};

exports.getBooks = async (req, res) => {
  const { author, genre, page = 1, limit = 10 } = req.query; // adding paginatio of limit 10 
  const filter = {};
  if (author) filter.author = new RegExp(author, 'i');
  if (genre) filter.genre = new RegExp(genre, 'i');

  try {
    const books = await Book.find(filter) // find used to search in the db
      .skip((page - 1) * limit)
      .limit(parseInt(limit));
    res.json(books); // send as response
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getBookDetails = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id); // sending id as parameter to the db 
    const reviews = await Review.find({ book: book._id }) //id is then matched with the present book ids
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

exports.searchBooks = async (req, res) => {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ message: 'Search query is required' });
  }

  try {
    const books = await Book.find({
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { author: { $regex: query, $options: 'i' } },
      ],
    });

    res.json(books);
  } catch (error) {
    res.status(500).json({ message: 'Search failed', error: error.message });
  }
};