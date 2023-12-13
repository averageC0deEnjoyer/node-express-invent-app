const Category = require('../models/categoryModel');
const Item = require('../models/itemModel');
const asyncHandler = require('express-async-handler');

exports.index = asyncHandler(async (req, res, next) => {
  const [
    numElectronicItem,
    numFurnitureItem,
    numFoodItem,
    numClothItem,
    numToyItem,
    numBookItem,
    numOtherItem,
  ] = await Promise.all([
    Item.aggregate([
      {
        $lookup: {
          from: 'categories',
          localField: 'category',
          foreignField: '_id',
          as: 'category',
        },
      },
      {
        $match: {
          'category.name': 'Electronics',
        },
      },
    ])
      .exec()
      .then((res) => res.length),
    Item.aggregate([
      {
        $lookup: {
          from: 'categories',
          localField: 'category',
          foreignField: '_id',
          as: 'category',
        },
      },
      {
        $match: {
          'category.name': 'Furnitures',
        },
      },
    ])
      .exec()
      .then((res) => res.length),
    Item.aggregate([
      {
        $lookup: {
          from: 'categories',
          localField: 'category',
          foreignField: '_id',
          as: 'category',
        },
      },
      {
        $match: {
          'category.name': 'Foods',
        },
      },
    ])
      .exec()
      .then((res) => res.length),
    Item.aggregate([
      {
        $lookup: {
          from: 'categories',
          localField: 'category',
          foreignField: '_id',
          as: 'category',
        },
      },
      {
        $match: {
          'category.name': 'Clothes',
        },
      },
    ])
      .exec()
      .then((res) => res.length),
    Item.aggregate([
      {
        $lookup: {
          from: 'categories',
          localField: 'category',
          foreignField: '_id',
          as: 'category',
        },
      },
      {
        $match: {
          'category.name': 'Toys',
        },
      },
    ])
      .exec()
      .then((res) => res.length),
    Item.aggregate([
      {
        $lookup: {
          from: 'categories',
          localField: 'category',
          foreignField: '_id',
          as: 'category',
        },
      },
      {
        $match: {
          'category.name': 'Books',
        },
      },
    ])
      .exec()
      .then((res) => res.length),
    Item.aggregate([
      {
        $lookup: {
          from: 'categories',
          localField: 'category',
          foreignField: '_id',
          as: 'category',
        },
      },
      {
        $match: {
          'category.name': 'Others',
        },
      },
    ])
      .exec()
      .then((res) => res.length),
  ]);

  //   const numElectronicItem = await Item.find()
  //     .populate('category', 'name')
  //     // .countDocuments()
  //     .exec()
  //     .then((items) =>
  //       items.filter((item) => item.category.name === 'Electronicss')
  //     );
  // .then((res) => res);

  // .countDocuments({ category: { $elemMatch: { name: 'Electronics' } } })

  res.render('index', {
    title: 'Inventory Apps',
    numElectronicItem: numElectronicItem,
    numFurnitureItem: numFurnitureItem,
    numFoodItem: numFoodItem,
    numClothItem: numClothItem,
    numToyItem: numToyItem,
    numBookItem: numBookItem,
    numOtherItem: numOtherItem,
  });
});

exports.category_list = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: category list');
});

exports.category_detail = asyncHandler((req, res, next) => {
  res.send('not implemented: category detail');
});

// Display category create form on GET.
exports.category_create_get = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: category create GET');
});

// Handle category create on POST.
exports.category_create_post = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: category create POST');
});

// Display category delete form on GET.
exports.category_delete_get = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: category delete GET');
});

// Handle category delete on POST.
exports.category_delete_post = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: category delete POST');
});

// Display category update form on GET.
exports.category_update_get = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: category update GET');
});

// Handle category update on POST.
exports.category_update_post = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: category update POST');
});
