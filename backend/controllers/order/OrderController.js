const { Order } = require("../../models/order/orderModel");
const { OrderItem } = require("../../models/order/orderItemModel");
const stripe = require("stripe")(
  "sk_test_51KkYSaBpnie1hhd2dS0YdhmKNmeKiRovpxprC8IUBHk8Pzq2LMdOLdl8leQkmW5sbvXTCOUH6FOudY0BEALKkaoN00v7AHUKgV"
);
const { Product } = require("../../models/products/productsModel");
exports.getOrderDetails = async (req, res) => {
  const orderList = await Order.find();
  if (!orderList) {
    res.send({ message: "No order in the inventory" }).status(500);
  }
  res.send({ orders: orderList });
};

exports.saveOrderDetails = async (req, res) => {
  const orderItemsIdList = req.body.orderItems.map(async (item) => {
    let newOrderItem = new OrderItem({
      quantity: item.quantity,
      product: item.product,
    });
    let newOrderItems = await newOrderItem.save();
    return newOrderItems._id;
  });

  const orderItemsIds = await Promise.all(orderItemsIdList);

  let order = new Order({
    orderItems: orderItemsIds,
    address: req.body.address,
    city: req.body.city,
    zipcode: req.body.zip,
    status: req.body.status,
    price: req.body.price,
    user: req.body.user,
  });
  order
    .save()
    .then(async (OrderedResponse) => {
      await sendEmail(
        req.body.email,
        `Order number - ${OrderedResponse._id} `,
        "Order has been placed successfully. Stay tuned for further updates."
      );
      res.send({ data: OrderedResponse, success: true }).status(201);
    })
    .catch(async (err) => {
      console.log(err)
      res.send({ error: err, success: false }).status(500);
    });
};

exports.createCheckoutSession = async (req, res) => {
  const items = req.body.orderItems;
  const lineItems = Promise.all(
    items.map(async (item) => {
      const product = await Product.findById(item.productId);
      return {
        price_data: {
          currency: "CAD",
          product_data: {
            name: product["name"],
          },
          unit_amount: (product["price"] * 0.15 + product["price"] + 30) * 100,
        },
        quantity: item.quantity,
      };
    })
  );
  const LineItems = await lineItems;
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: LineItems,
    mode: "payment",
    // success_url: "http://localhost:4200/success",
    // cancel_url: "http://localhost:4200/failure",
    success_url: "https://csci-5709-angular-group-4.herokuapp.com/success",
    cancel_url: "https://csci-5709-angular-group-4.herokuapp.com/failure",
  });
  res.send({ id: session.id }).status(201);
};

const sendEmail = async (email, subject, text) => {
  try {
    var nodemailer = require("nodemailer");

    var transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      requireTLS: true,
      auth: {
        user: "scotia.jwellers@gmail.com",
        pass: "wjcdrechqgtmzfrs",
      },
    });

    var mailOptions = {
      from: "scotia.jwellers@gmail.com",
      to: email,
      subject: subject,
      text: text,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  } catch (err) {
    return err;
  }
};
