#! /usr/bin/env node

console.log(
  'This script populates some test books, authors, genres and bookinstances to your database. Specified database as argument - e.g.: node populatedb "mongodb+srv://cooluser:coolpassword@cluster0.lz91hw2.mongodb.net/local_library?retryWrites=true&w=majority"'
);

// Get arguments passed on command line
const userArgs = process.argv.slice(2);

const Category = require('./models/categoryModel');
const Item = require('./models/itemModel');

const categories = [];
const items = [];

const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

const mongoDB = userArgs[0];

main().catch((err) => console.log(err));

async function main() {
  console.log('Debug: About to connect');
  await mongoose.connect(mongoDB);
  console.log('Debug: Should be connected?');
  await createCategories();
  await createItems();
  console.log('Debug: Closing mongoose');
  mongoose.connection.close();
}

async function categoryCreate(index, name, desc) {
  const categorydetail = { name: name, desc: desc };

  const category = new Category(categorydetail);

  await category.save();
  categories[index] = category;
  console.log(`Added category: ${name}`);
}

async function itemCreate(index, name, desc, category, price, stock) {
  const itemdetail = {
    name: name,
    desc: desc,
    category: category,
    price: price,
  };
  if (stock != false) itemdetail.stock = stock;

  const item = new Item(itemdetail);
  await item.save();
  items[index] = item;
  console.log(`Added item: ${name}`);
}

async function createCategories() {
  console.log('Adding categories');
  await Promise.all([
    categoryCreate(
      0,
      'Electronics',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
    ),
    categoryCreate(
      1,
      'Furnitures',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
    ),
    categoryCreate(
      2,
      'Foods',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
    ),
    categoryCreate(
      3,
      'Toys',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
    ),
    categoryCreate(
      4,
      'Clothes',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
    ),
    categoryCreate(
      5,
      'Books',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
    ),
    categoryCreate(
      6,
      'Others',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
    ),
  ]);
}

async function createItems() {
  console.log('Adding items');
  await Promise.all([
    itemCreate(
      0,
      'Samsun S2',
      'Lorem ipsum dolor sit amet',
      [categories[0], categories[1], categories[2]],
      20.5,
      5
    ),
    itemCreate(
      1,
      'iPone',
      'Lorem ipsum dolor sit amet',
      [categories[1], categories[2], categories[3]],
      10.5
    ),
    itemCreate(
      2,
      'abibas shoes',
      'Lorem ipsum dolor sit amet',
      [categories[4], categories[5], categories[6]],
      25.5,
      6
    ),
    itemCreate(
      3,
      'abibas sandal',
      'Lorem ipsum dolor sit amet',
      [categories[4], categories[5], categories[6]],
      30.5
    ),
    itemCreate(
      4,
      'ice cream',
      'Lorem ipsum dolor sit amet',
      [categories[4], categories[5], categories[6]],
      31.5,
      7
    ),
    itemCreate(
      5,
      'remote control car',
      'Lorem ipsum dolor sit amet',
      [categories[2], categories[3], categories[4]],
      13.5
    ),
    itemCreate(
      6,
      'white t-shirt',
      'Lorem ipsum dolor sit amet',
      [categories[2], categories[3], categories[4]],
      14.5,
      8
    ),
    itemCreate(
      7,
      'black t-shirt',
      'Lorem ipsum dolor sit amet',
      [categories[2], categories[3], categories[4]],
      15.5,
      9
    ),
    itemCreate(
      8,
      'manga',
      'Lorem ipsum dolor sit amet',
      [categories[3], categories[5], categories[6]],
      5.5
    ),
    itemCreate(
      9,
      'lemon drink',
      'Lorem ipsum dolor sit amet',
      [categories[3], categories[6], categories[6]],
      10.5,
      10
    ),
    itemCreate(
      10,
      'orange drink',
      'Lorem ipsum dolor sit amet',
      [categories[2], categories[4], categories[6]],
      12.5,
      11
    ),
    itemCreate(
      11,
      'paracetamol',
      'Lorem ipsum dolor sit amet',
      [categories[2], categories[4], categories[6]],
      13.5,
      12
    ),
    itemCreate(
      12,
      'gaming mouse',
      'Lorem ipsum dolor sit amet',
      [categories[2], categories[4], categories[6]],
      14.5,
      13
    ),
    itemCreate(
      13,
      'monitor',
      'Lorem ipsum dolor sit amet',
      [categories[2], categories[4], categories[6]],
      30.5,
      13
    ),
    itemCreate(
      14,
      'pants',
      'Lorem ipsum dolor sit amet',
      [categories[2], categories[4], categories[6]],
      40.5,
      14
    ),
    itemCreate(
      15,
      'socks',
      'Lorem ipsum dolor sit amet',
      [categories[1], categories[3], categories[5]],
      50.5,
      15
    ),
    itemCreate(
      16,
      'cable',
      'Lorem ipsum dolor sit amet',
      [categories[1], categories[3], categories[5]],
      60.5,
      16
    ),
    itemCreate(
      17,
      'cookie',
      'Lorem ipsum dolor sit amet',
      [categories[1], categories[3], categories[5]],
      54.5,
      17
    ),
    itemCreate(
      18,
      'session',
      'Lorem ipsum dolor sit amet',
      [categories[1], categories[3], categories[5]],
      14.5,
      18
    ),
    itemCreate(
      19,
      'massage',
      'Lorem ipsum dolor sit amet',
      [categories[1], categories[3], categories[5]],
      30.5,
      19
    ),
    itemCreate(
      20,
      'cooking oil',
      'Lorem ipsum dolor sit amet',
      [categories[1], categories[3], categories[5]],
      40.5,
      20
    ),
    itemCreate(
      21,
      'chili oil',
      'Lorem ipsum dolor sit amet',
      [categories[0], categories[2], categories[5]],
      50.5,
      21
    ),
    itemCreate(
      22,
      'nuts',
      'Lorem ipsum dolor sit amet',
      [categories[0], categories[2], categories[5]],
      60.5,
      22
    ),
    itemCreate(
      23,
      'egg',
      'Lorem ipsum dolor sit amet',
      [categories[0], categories[2], categories[5]],
      54.5
    ),
    itemCreate(
      24,
      'doll',
      'Lorem ipsum dolor sit amet',
      [categories[0], categories[2], categories[5]],
      20.5
    ),
  ]);
}
