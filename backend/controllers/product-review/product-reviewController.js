/* 
Authored by Rutu Joshi, B00897744, rt296393@dal.ca
*/

const { Product } = require("../../models/products/productsModel");
const {
  ProductReview,
} = require("../../models/product-review/product-ReviewsModel");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dkjbxujnu",
  api_key: "384624719665962",
  api_secret: "v-gEZoflAk5eakpiLrUKFjMr1-U",
});

exports.getReviews = async (req, res) => {
  const { ObjectId } = require("mongodb");
  const user_id = "623f640942114cd76d04d632";
  const reviewsOfAUser = [];
  const otherReviews = [];
  try {
    const reviewList = await ProductReview.find({
      product_id: ObjectId(req.params.id),
    });

    if (!reviewList) {
      res
        .send({ message: "No reviews found in the inventory", success: false })
        .status(500);
    } else {
      reviewList.forEach((review) => {
        if (review.user_id != user_id) {
          // console.log("if");
          otherReviews.push(review);
        } else {
          // console.log("else if");
          reviewsOfAUser.push(review);
        }
      });

      // console.log(reviewsOfAUser);
    }
    return res
      .send({
        data: { array1: reviewsOfAUser, array2: otherReviews },
        success: true,
      })
      .status(200);
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong");
  }
};

exports.insertReviews = async (req, res) => {
  let ts = Date.now();
  let file;
  let reviewObj = JSON.parse(req.body.review);
  if (req.files) {
    file = req.files.picture;
  }

  let url;
  if (file) {
    url = await uploadImageToCloudinary(file);
  }

  let date_ob = new Date(ts);
  let date = date_ob.getDate();
  let month = date_ob.getMonth() + 1;
  let year = date_ob.getFullYear();
  let rdate = year + "-" + month + "-" + date;

  try {
    const review = new ProductReview({
      user_id: reviewObj.user_id,
      product_id: reviewObj.product_id,
      username: "test_user",
      reviewdate: rdate,
      rating: reviewObj.rating,
      description: reviewObj.description,
      images: url,
    });

    console.log(review);
    // res.send({ data: review, success: true }).status(201);
    await review
      .save()
      .then((prod) => {
        res.send({ data: review, success: true }).status(201);
      })
      .catch((err) => {
        res.send({ error: err, success: false }).status(500);
      });
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong");
  }
};

exports.deleteReview = async (req, res) => {
  try {
    ProductReview.findByIdAndDelete({ _id: req.params.id }, function (err) {
      if (err) {
        console.log(err);
        res
          .send({
            message: "No reviews found in the inventory",
            success: false,
          })
          .status(500);
      } else {
        res.send({ message: "Deleted", success: true }).status(200);
      }
    });
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong");
  }
};

const uploadImageToCloudinary = async (file) => {
  let imageArray = [];
  if (file.length > 1) {
    for (let i = 0; i < file.length; i++) {
      let result = await cloudinary.uploader.upload(file[i].tempFilePath, {
        folder: "test",
      });
      imageArray.push(result.url);
    }
    return imageArray;
  } else {
    let result = await cloudinary.uploader.upload(file.tempFilePath, {
      folder: "test",
    });
    imageArray.push(result.url);
    return imageArray;
  }
};
