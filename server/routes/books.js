const express = require('express');
const multer = require('multer');
const path = require('path');
const BookItem = require('../models/Book'); 

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });


router.post('/', upload.single('image'), async (req, res) => {
  const { title, author, description, price } = req.body;
  const image = req.file ? req.file.path : ''; 

  try {
    const newBook = new BookItem({ 
      title, 
      author, 
      description, 
      price, 
      image, 
      inStock: true 
    });
    await newBook.save();
    res.status(201).json(newBook);
  } catch (error) {
    res.status(500).json({ message: 'Error adding book', error });
  }
});

router.get('/', async (req, res) => {
  try {
    const books = await BookItem.find({ inStock: true });
    res.json(books);
  } catch (error) {
    res.status(500).send('Server Error');
  }
});
router.get('/:id', async (req, res) => {
  try {
    const book = await BookItem.findById(req.params.id);
    if (!book) {
      return res.status(404).send('Book not found');
    }
    res.json(book);
  } catch (error) {
    res.status(500).send('Server Error');
  }
});
router.patch('/:id', async (req, res) => {
  try {
    const book = await BookItem.findByIdAndUpdate(req.params.id, { inStock: false });
    if (!book) {
      return res.status(404).send('Book not found');
    }
    res.send('Book purchased');
  } catch (error) {
    res.status(500).send('Server Error');
  }
});


module.exports = router;
