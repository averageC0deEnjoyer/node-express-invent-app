const Item = require('../models/itemModel');
const Category = require('../models/categoryModel');
const { body, validationResult } = require('express-validator');
const asyncHandler = require('express-async-handler');

exports.item_list = asyncHandler(async (req, res, next) => {
  const allItems = await Item.find()
    .sort({ name: 1 })
    .populate('category')
    .exec();

  res.render('item_list', { title: 'Item List', allItems: allItems });
});

exports.item_detail = asyncHandler(async (req, res, next) => {
  const selectedItem = await Item.findById(req.params.id)
    .populate('category')
    .exec();

  if (selectedItem === null) {
    const err = new Error('Item not found');
    err.status = 404;
    return next(err);
  }

  res.render('item_detail', { title: 'Item Detail', item: selectedItem });
});

// Display item create form on GET.
exports.item_create_get = asyncHandler(async (req, res, next) => {
  const allCategories = await Category.find().sort({ name: 1 }).exec();

  res.render('item_form', {
    title: 'Create Item',
    allCategories: allCategories,
  });
});

// Handle item create on POST.
exports.item_create_post = [
  (req, res, next) => {
    console.log(req.body.category);
    if (!Array.isArray(req.body.category)) {
      req.body.category =
        typeof req.body.category === 'undefined' ? [] : [req.body.category];
    }
    console.log(req.body.category);

    next();
  },

  body('name', 'name must not be empty').trim().isLength({ min: 3 }).escape(),
  body('desc', 'desc must > 10 char').trim().isLength({ min: 10 }).escape(),
  body('category.*').escape(),
  body('price', 'price must not be empty').trim().escape(),
  body('stock').trim().escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const newItem = new Item({
      name: req.body.name,
      desc: req.body.desc,
      category: req.body.category,
      price: req.body.price,
      stock: req.body.stock,
    });

    if (!errors.isEmpty()) {
      const allCategories = await Category.find().sort({ name: 1 }).exec();

      for (const category of allCategories) {
        if (newItem.category.includes(category._id)) {
          category.checked = 'true';
        }
      }
      res.render('item_form', {
        title: 'Create Item',
        allCategories: allCategories,
        item: newItem,
        errors: errors.array(),
      });
    } else {
      await newItem.save();
      res.redirect(newItem.url);
    }
  }),
];

// Display item delete form on GET.
exports.item_delete_get = asyncHandler(async (req, res, next) => {
  const selectedItem = await Item.findById(req.params.id).exec();

  if (selectedItem === null) {
    res.redirect('/inventory/items');
  }

  res.render('item_delete', {
    title: 'Delete Item',
    item: selectedItem,
  });
});

// Handle item delete on POST.
exports.item_delete_post = asyncHandler(async (req, res, next) => {
  await Item.findByIdAndDelete(req.params.id).exec();
  res.redirect('/inventory/items');
});

// Display item update form on GET.
exports.item_update_get = asyncHandler(async (req, res, next) => {
  const [selectedItem, allCategories] = await Promise.all([
    Item.findById(req.params.id).populate('category').exec(),
    Category.find({}).sort({ name: 1 }).exec(),
  ]);

  if (selectedItem === null) {
    const err = new Error('Item not found');
    err.status = 404;
    return next(err);
  }

  //cant used .includes, because the selectedItem.category isnt array but arrayofObject, already populated
  for (const category of allCategories) {
    for (const doc of selectedItem.category) {
      if (category._id.toString() === doc._id.toString()) {
        category.checked = 'true';
      }
    }
  }

  res.render('item_form', {
    title: 'Update Item',
    item: selectedItem,
    allCategories: allCategories,
  });
});

// Handle item update on POST.
exports.item_update_post = [
  (req, res, next) => {
    if (!Array.isArray(req.body.category)) {
      req.body.category =
        typeof req.body.category === 'undefined' ? [] : [req.body.category];
    }
    next();
  },
  body('name', 'name must not be empty').trim().isLength({ min: 3 }).escape(),
  body('desc', 'desc must >10 char').trim().isLength({ min: 10 }).escape(),
  body('category.*').escape(),
  body('price', 'price must not be empty').trim(),
  body('stock').trim().escape(),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const updatedItem = new Item({
      name: req.body.name,
      desc: req.body.desc,
      category:
        typeof req.body.category === 'undefined' ? [] : req.body.category,
      price: req.body.price,
      stock: req.body.stock,
      _id: req.params.id,
    });

    if (!errors.isEmpty()) {
      const allCategories = await Category.find().sort({ name: 1 }).exec();

      for (const category of allCategories) {
        if (updatedItem.category.includes(category._id)) {
          category.checked = 'true';
        }
      }

      res.render('item_form', {
        title: 'Update Item',
        allCategories: allCategories,
        item: updatedItem,
        errors: errors.array(),
      });
      return;
    } else {
      const successfulUpdatedItem = await Item.findByIdAndUpdate(
        req.params.id,
        updatedItem,
        {}
      );
      res.redirect(successfulUpdatedItem.url);
    }
  }),
];
