const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title:    { 
        type: String, 
        required: true 
    },
    author:   { 
        type: String, 
        required: true 
    },
    genre:    { 
        type: String, 
        required: true 
    },
    description: String,
    publishedYear: Number,
    createdBy: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    }
}, { timestamps: true });

bookSchema.index({ title: 'text', author: 'text' }); // text index for search
module.exports = mongoose.model('Book', bookSchema);
