const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// get all categories
router.get('/', async (req, res) => {
  try {
    const categories = await Category.findAll({
      include: [{ model: Product }] 
    });

    res.json(categories); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

//get category and associated products by id
router.get('/:id', async (req, res) => {
  const categoryId = req.params.id;

  try {
    const category = await Category.findOne({
      where: { id: categoryId },
      include: [{ model: Product }] 
    });

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.json(category); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

//create a new category
router.post('/', async (req, res) => {
  try {
    const newCategory = await Category.create(req.body);
    res.status(201).json(newCategory);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

//update a category by its id value
router.put('/:id', async (req, res) => {
  try {
    const updatedCategory = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if (updatedCategory[0] === 0) {
      res.status(404).json({ message: 'Category not found' });
      return;
    }

    res.status(200).json({ message: 'Category updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

//delete a category by its id value
router.delete('/:id', async (req, res) => {
  try {
    const deletedCategory = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (deletedCategory === 0) {
      res.status(404).json({ message: 'Category not found' });
      return;
    }

    res.status(200).json({ message: 'Category deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

module.exports = router;
