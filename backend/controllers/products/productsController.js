const { Product } = require("../../models/products/productsModel");
const { Category } = require("../../models/category/categoryModel");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dkjbxujnu",
  api_key: "384624719665962",
  api_secret: "v-gEZoflAk5eakpiLrUKFjMr1-U",
});

exports.getProductDetails = async (req, res) => {
  let filter = {};
  if (req.query.categories) {
    filter = { category: req.query.categories.split(",") };
  }
  const productList = await Product.find(filter).populate("category");
  if (!productList) {
    res.send({ message: "No products in the inventory" }).status(500);
  }
  res.send({ products: productList });
};

exports.getProductDetailsById = async (req, res) => {
  const productList = await Product.findById(req.params.id).populate(
    "category"
  );
  if (!productList) {
    res
      .send({ message: "No products found in the inventory", success: false })
      .status(500);
  }
  res.send({ products: productList, success: true }).status(200);
};

exports.insertProductDetails = async (req, res) => {
  const category = await Category.findById(req.body.category);
  if (!category) return res.send("Invalid category").status(400);
  const product = new Product({
    name: req.body.name,
    description: req.body.description,
    About: req.body.About,
    brand: req.body.brand,
    price: req.body.price,
    category: req.body.category,
    image: req.body.image,
    stock: req.body.stock,
    rating: req.body.rating,
    isFlash: req.body.isFlash,
  });
  product
    .save()
    .then((prod) => {
      res.send({ data: prod, success: true }).status(201);
    })
    .catch((err) => {
      res.send({ error: err, success: false }).status(500);
    });
};

exports.updateProductDetailsById = async (req, res) => {
  const productList = await Product.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      description: req.body.description,
      About: req.body.About,
      brand: req.body.brand,
      price: req.body.price,
      category: req.body.category,
      image: req.body.image,
      stock: req.body.stock,
      rating: req.body.rating,
      isFlash: req.body.isFlash,
    },
    { new: true }
  );
  if (!productList) {
    res
      .send({
        message:
          "Product not found in the inventory and hence couldn't update it",
        success: false,
      })
      .status(500);
  }
  res.send({ products: productList, success: true }).status(200);
};

exports.getFlashDealProducts = async (req, res) => {
  const count = req.params.count ? req.params.count : 0;
  const productList = await Product.find({ isFlash: true }).limit(+count);
  if (!productList) {
    res.send({ message: "No flash deals found", success: false }).status(500);
  }
  res.send({ products: productList, success: true }).status(200);
};

exports.uploadImageToCloudinary = async (req, res) => {
  let file = req.files.picture;
  if (file.length > 1) {
    let imageArray = [];
    for (let i = 0; i < file.length; i++) {
      let result = await cloudinary.uploader.upload(file[i].tempFilePath, {
        folder: "test",
      });
      imageArray.push({ url: result.url });
    }
    res.send({ url: imageArray }).status(200);
  } else {
    let result = await cloudinary.uploader.upload(file.tempFilePath, {
      folder: "test",
    });
    res.send({ url: result.url }).status(200);
  }
};
