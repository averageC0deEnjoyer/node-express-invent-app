const Category = require('../models/categoryModel');
const Item = require('../models/itemModel');
const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');

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
  const allCategories = await Category.find().sort({ name: 1 }).exec();

  res.render('category_list', {
    title: 'Category List',
    allCategories: allCategories,
  });
});

exports.category_detail = asyncHandler(async (req, res, next) => {
  const [selectedCategory, itemsInCategory] = await Promise.all([
    Category.findById(req.params.id).exec(),
    Item.find({ category: req.params.id }).exec(),
  ]);

  if (selectedCategory === null) {
    const err = new Error('Category not found');
    err.status = 404;
    return next(err);
  }

  res.render('category_detail', {
    title: 'Category Detail',
    category: selectedCategory,
    items: itemsInCategory,
  });
});

// Display category create form on GET.
exports.category_create_get = asyncHandler(async (req, res, next) => {
  res.render('category_form', { title: 'Create Category' });
});

// Handle category create on POST.
exports.category_create_post = [
  body('name', 'Category name must contain at least 3 characters')
    .trim()
    .isLength({ min: 3 })
    .escape(),
  body('desc', 'Category desc must contain at least 10 characters')
    .trim()
    .isLength({ min: 10 })
    .escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const newCategory = new Category({
      name: req.body.name,
      desc: req.body.desc,
    }); // this is to repopulate form if there is error and to create new category if no error

    if (!errors.isEmpty()) {
      res.render('category_form', {
        title: 'Create Category',
        category: newCategory,
        errors: errors.array(),
      });
      return;
    } else {
      const categoryExist = await Category.findOne({
        name: req.body.name,
      })
        .collation({ locale: 'en', strength: 2 })
        .exec();
      if (categoryExist) {
        res.redirect(categoryExist.url);
      } else {
        await newCategory.save();
        res.redirect(newCategory.url);
      }
    }
  }),
];

// Display category delete form on GET.
exports.category_delete_get = asyncHandler(async (req, res, next) => {
  const [category, allItemsInCategory] = await Promise.all([
    Category.findById(req.params.id).exec(),
    Item.find({ category: req.params.id }).exec(),
  ]);

  if (category === null) {
    res.redirect('/inventory/categories');
  }

  res.render('category_delete', {
    title: 'Delete Category',
    category: category,
    allItemsInCategory: allItemsInCategory,
  });
});

// Handle category delete on POST.
exports.category_delete_post = asyncHandler(async (req, res, next) => {
  //another guardrail , even though in get route already there
  const [category, allItemsInCategory] = await Promise.all([
    Category.findById(req.params.id).exec(),
    Item.find({ category: req.params.id }).exec(),
  ]);

  if (allItemsInCategory.length > 0) {
    res.render('category_delete', {
      title: 'Delete Category',
      category: category,
      allItemsInCategory: allItemsInCategory,
    });
    return;
  } else {
    await Category.findByIdAndDelete(req.body.categoryid);
    res.redirect('/inventory/categories');
  }
});

// Display category update form on GET.
exports.category_update_get = asyncHandler(async (req, res, next) => {
  const selectedCategory = await Category.findById(req.params.id).exec();

  if (selectedCategory === null) {
    const err = new Error('Category not found');
    err.status = 404;
    return next(err);
  }

  res.render('category_form', {
    title: 'Update Category',
    category: selectedCategory,
  });
});

// Handle category update on POST.
exports.category_update_post = [
  body('name', 'name must not be empty').trim().isLength({ min: 3 }).escape(),
  body('desc').trim().isLength({ min: 10 }).escape(),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const updatedCategory = new Category({
      name: req.body.name,
      desc: req.body.desc,
      _id: req.params.id,
    });

    if (!errors.isEmpty()) {
      res.render('category_form', {
        title: 'Update Category',
        category: updatedCategory,
        errors: errors.array(),
      });
      return;
    } else {
      const successfulUpdatedCategory = await Category.findByIdAndUpdate(
        req.params.id,
        updatedCategory,
        {}
      );
      res.redirect(successfulUpdatedCategory.url);
    }
  }),
];
