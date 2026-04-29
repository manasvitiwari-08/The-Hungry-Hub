const express = require('express');
const router = express.Router();
const multer = require('multer');
const { protect, adminOnly } = require('../middleware/auth');
const MenuItem = require('../models/MenuItem');
const { uploadToCloudinary } = require('../utils/cloudinary');

// Multer — memory storage, 5 MB limit
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith('image/')) {
      return cb(new Error('Only image files are allowed'), false);
    }
    cb(null, true);
  },
});

// ── GET /api/menu ────────────────────────────────────────────
// Supports ?category=Burgers&search=burger
router.get('/', async (req, res, next) => {
  try {
    const filter = { isAvailable: true };

    if (req.query.category) {
      filter.category = req.query.category;
    }

    if (req.query.search) {
      const regex = new RegExp(req.query.search, 'i');
      filter.$or = [{ name: regex }, { description: regex }, { tag: regex }];
    }

    const items = await MenuItem.find(filter).sort({ createdAt: -1 });
    res.json({ items });
  } catch (err) {
    next(err);
  }
});

// ── GET /api/menu/:id ────────────────────────────────────────
router.get('/:id', async (req, res, next) => {
  try {
    const item = await MenuItem.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: 'Menu item not found' });
    }
    res.json({ item });
  } catch (err) {
    next(err);
  }
});

// ── POST /api/menu ───────────────────────────────────────────
// Admin only — create menu item with optional image upload
router.post('/', protect, adminOnly, upload.single('image'), async (req, res, next) => {
  try {
    const { name, description, price, category, tag, isAvailable } = req.body;

    if (!name || !price || !category) {
      return res.status(400).json({ message: 'Name, price, and category are required' });
    }

    let imageUrl = '';
    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer, 'menu-items');
      imageUrl = result.secure_url;
    }

    const item = await MenuItem.create({
      name,
      description: description || '',
      price: Number(price),
      category,
      image: imageUrl,
      tag: tag || '',
      isAvailable: isAvailable !== undefined ? isAvailable : true,
    });

    res.status(201).json({ message: 'Menu item created', item });
  } catch (err) {
    next(err);
  }
});

// ── PUT /api/menu/:id ────────────────────────────────────────
// Admin only — update item
router.put('/:id', protect, adminOnly, upload.single('image'), async (req, res, next) => {
  try {
    const item = await MenuItem.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: 'Menu item not found' });
    }

    const { name, description, price, category, tag, isAvailable } = req.body;

    if (name !== undefined) item.name = name;
    if (description !== undefined) item.description = description;
    if (price !== undefined) item.price = Number(price);
    if (category !== undefined) item.category = category;
    if (tag !== undefined) item.tag = tag;
    if (isAvailable !== undefined) item.isAvailable = isAvailable;

    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer, 'menu-items');
      item.image = result.secure_url;
    }

    await item.save();

    res.json({ message: 'Menu item updated', item });
  } catch (err) {
    next(err);
  }
});

// ── DELETE /api/menu/:id ─────────────────────────────────────
// Admin only — delete item
router.delete('/:id', protect, adminOnly, async (req, res, next) => {
  try {
    const item = await MenuItem.findByIdAndDelete(req.params.id);
    if (!item) {
      return res.status(404).json({ message: 'Menu item not found' });
    }
    res.json({ message: 'Menu item deleted' });
  } catch (err) {
    next(err);
  }
});

// ── POST /api/menu/:id/rate ──────────────────────────────────
// Protected — rate an item (1–5)
router.post('/:id/rate', protect, async (req, res, next) => {
  try {
    const { rating } = req.body;

    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({ message: 'Rating must be between 1 and 5' });
    }

    const item = await MenuItem.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: 'Menu item not found' });
    }

    // Recalculate running average
    const newCount = item.ratingCount + 1;
    const newRating = ((item.rating * item.ratingCount) + Number(rating)) / newCount;

    item.rating = Math.round(newRating * 10) / 10; // 1 decimal place
    item.ratingCount = newCount;
    await item.save();

    res.json({ message: 'Rating submitted', rating: item.rating, ratingCount: item.ratingCount });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
