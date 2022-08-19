const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  Category.findAll({
    attributes: ['id', 'category_name'],
    include: [{
      model: Product,
      attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
    }]
  })
  .then(dbData => res.json(dbData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
  // find all categories
  // be sure to include its associated Products
});

router.get('/:id', (req, res) => {
  Category.findOne({
    where: {id: req.params.id},
    attributes: ['id', 'category_name'],
    include: [{
      model: Product,
      attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
    }]
  })
  .then(dbData => {
    if (!dbData) {
      res.status(400).json({ message: 'ID could not be found' });
      return;
    }
  res.json(dbData);
  })
  .catch(err => {
      console.log(err);
      res.status(500).json(err);
  });
  // find one category by its `id` value
  // be sure to include its associated Products
});

router.post('/', (req, res) => {
  Category.create({
    category_name: req.body.category_name
  })
  .then(dbData => res.json(dbData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
  // create a new category
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(
    {
      category_name: req.body.category_name
    },
    {
      where: {id: req.params.id},
    }
  )
  .then(dbData => {
    if (!dbData) {
      res.status(400).json({ message: 'ID could not be found' });
      return;
    }
  res.json(dbData);
  })
  .catch(err => {
      console.log(err);
      res.status(500).json(err);
  })
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {id: req.params.id},
  })
  .then(dbData => {
    if (!dbData) {
      res.status(400).json({ message: 'ID could not be found' });
      return;
    }
  res.json(dbData);
  })
  .catch(err => {
      console.log(err);
      res.status(500).json(err);
  })
});

module.exports = router;
