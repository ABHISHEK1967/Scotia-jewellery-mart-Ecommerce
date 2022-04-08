const { Product } = require("../../models/products/productsModel");
const { BiddingProduct } = require("../../models/biddingProducts/biddingProductsModel");
const {Category} = require("../../models/category/categoryModel");


const products = [
    new Product({
        name: 'Gold Necklace',
        description: 'Specifications: Length 24 Inches, Width 10mm, Weight app 66 Gram. Impressive and Attractive: When you walk into a room or walk in the street you’ll get glances.',
        About: 'About',
        brand: 'Cartier',
        price: 2000,
        category: '623cb9aaa73b1b563b39306a',
        images: ["assets/images/gold_necklace_1.jpg"],
        stock: 3,
        rating: 5,
        reviews: []
    }),
    new Product({
        name: 'Gold Ring',
        description: 'ELEGANT DESIGN Our open twisted eternity band offers a unique minimalist design. A simple and dainty design that swivels as an eye-catching modern fashionable ring that is available in rose gold, white gold and yellow gold.',
        About: 'About',
        brand: 'Cartier',
        price: 3000,
        category: '623a454c25b1bfcd9db54834',
        images: ["assets/images/gold_ring_1.jpg"],
        stock: 3,
        rating: 5,
        reviews: []
    }),
    new Product({
        name: 'Diamond Necklace',
        description: 'Classically elegant, this cable chain diamond necklace features a striking round diamond pendant set in 14k white gold.',
        About: 'About',
        brand: 'Tiffany',
        price: 5500,
        category: '623cb9aaa73b1b563b39306a',
        images: ["assets/images/diamond_necklace_1.jpeg"],
        stock: 2,
        rating: 3,
        reviews: []
    }),
    new Product({
        name: 'Diamond Ring',
        description: 'This dainty ring features sheer sparkle that extends halfway around the ring. The center gem appears to float above the delicate band (1/4 total carat weight).',
        About: 'About',
        brand: 'Tiffany',
        price: 3000,
        category: '623a454c25b1bfcd9db54834',
        images: ["assets/images/gold_necklace_1.jpg"],
        stock: 3,
        rating: 5,
        reviews: []
    }),
    new Product({
        name: 'Diamond Earrings',
        description: 'Beautifully matched, these diamond stud earrings feature round, near-colourless diamonds set in 14k white gold four-claw settings with guardian backs and posts.',
        About: 'About',
        brand: 'Tiffany',
        price: 1000,
        category: '623cbb9fa73b1b563b39306c',
        images: ["assets/images/diamond_earrings_1.jpg"],
        stock: 3,
        rating: 5,
        reviews: []
    }),
    new Product({
        name: 'Gold Earrings',
        description: 'Gold Drop Earrings - Buy Online 22K Indian Gold screw back Drop Earrings, South Indian Gold Drop Earrings like gold jhumkas, Gold Makarakundanalu earrings, Indian Gold chandelier earrings made in India. South Indian Gold Drop Earrings with south Indian style screw backs (Madras Screw) or Bombay screw back Gold Drop earrings made in India. View latest designs of Indian gold Drop earrings - Indian Gold Jewelry',
        About: 'About',
        brand: 'Cartier',
        price: 1200,
        category: '623cbb9fa73b1b563b39306c',
        images: ["gold_earrings_1.jpg"],
        stock: 3,
        rating: 5,
        reviews: []
    })
]


exports.testAdd = async (req, res) => {
    for (const product of products) {
        const category = await Category.findById(product.category);
        if (!category) return res.send("Invalid category").status(400);

        product
            .save()
            .then((prod) => {
                console.log({'add': product});
            })
            .catch((err) => {
                console.log(err);
            });
    }
    res.send('success!');
};