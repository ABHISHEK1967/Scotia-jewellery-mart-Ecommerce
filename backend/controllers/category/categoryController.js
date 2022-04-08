const { Category } = require("../../models/category/categoryModel");

exports.getCategoryDetails = async (req, res) => {
  const categoryList = await Category.find({});
  if (!categoryList) {
    res.send({ message: "No categories in the inventory" }).status(500);
  }
  res.send({ categories: categoryList }).status(201);
};

exports.getCategoryDetailsById = async (req, res) => {
  let id = req.params.id;
  const categoryData = await Category.findById(id);
  if (!categoryData) {
    res
      .send({
        message: "The category you are looking for is not available",
        success: false,
      })
      .status(500);
  }
  res.send({ category: categoryData, success: true }).status(201);
};

exports.insertCategoryDetails = async (req, res) => {
  const category = new Category({
    name: req.body.name,
    icon: req.body.icon,
    colour: req.body.colour,
  });
  category
    .save()
    .then((categoryData) => {
      res.send({ category: categoryData, success: true }).status(201);
    })
    .catch((err) => {
      res.send({ error: err, success: false });
    });
};

exports.updateCategoryDetails = async (req, res) => {
  const category = await Category.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      icon: req.body.icon,
      colour: req.body.colour,
    },
    { new: true }
  );

  if (!category) {
    res.send({ error: err, success: false }).status(400);
  }
  res.send({ category: category, success: true }).status(201);
};

exports.deleteCategoryDetailsById = async (req, res) => {
  let id = req.params.id;
  Category.findByIdAndRemove(id)
    .then((category) => {
      res
        .send({ data: category, message: "Category deleted successfully" })
        .status(201);
    })
    .catch((err) => {
      res.send({ error: err, success: false }).status(500);
    });
};
