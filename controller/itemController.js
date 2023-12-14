const Item = require('../models/itemModel');
const Category = require('../models/categoryModel');

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
  res.send('NOT IMPLEMENTED: item create GET');
});

// Handle item create on POST.
exports.item_create_post = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: item create POST');
});

// Display item delete form on GET.
exports.item_delete_get = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: item delete GET');
});

// Handle item delete on POST.
exports.item_delete_post = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: item delete POST');
});

// Display item update form on GET.
exports.item_update_get = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: item update GET');
});

// Handle item update on POST.
exports.item_update_post = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: item update POST');
});
