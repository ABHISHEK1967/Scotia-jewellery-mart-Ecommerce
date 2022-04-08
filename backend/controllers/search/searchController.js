/*
Authored by Xiao Ling, B00877105, xz540782@dal.ca
 */

const { Product } = require("../../models/products/productsModel");
const { BiddingProduct } = require("../../models/biddingProducts/biddingProductsModel");
const _ = require('underscore');

// process user input to query parameters
// fullMatch: products whose name or description match the user input exactly
// partialMatch: products whose name or description match the user input partially
function processSearchKeyword(input) {
    let keywords = []
    keywords.push(...input.split(' '));
    const reInput = new RegExp(`.*${input}.*`, 'i');
    // constraint of matching user input exactly
    const fullyMatchConstraintOr = [{ name: reInput }, { description: reInput }];
    const partialMatchConstraintOr = [];
    const partialMatchConstraintAnd = [];

    for (const keyword of keywords) {
        // constraint of not matching user input exactly but partially
        const reKeyword = new RegExp(`.*${keyword}.*`, 'i');
        const reNoInput = new RegExp(`^(?!${input}).*`, 'i');
        partialMatchConstraintOr.push([{ name: reKeyword }, { description: reKeyword }]);
        partialMatchConstraintAnd.push([{ name: reNoInput }, { description: reNoInput }]);
    }

    return {
        keywords: keywords,
        fullyMatchConstraintOr: fullyMatchConstraintOr,
        partialMatchConstraintOr: partialMatchConstraintOr,
        partialMatchConstraintAnd:  partialMatchConstraintAnd
    }
}


// process filters to query parameters
function processFilter(body) {

    const filters = body.filter;
    // constraints that all filters need to be applied
    let dbFiltersAnd = [];

    if (filters.category) {
        dbFiltersAnd.push({category: filters.category});
    }

    if (filters.brand) {
        const reBrand = new RegExp(`.*${filters.brand}.*`, 'i');
        dbFiltersAnd.push({brand: reBrand});
    }

    if (filters.min_price) {
        dbFiltersAnd.push({price: {$gte: filters.min_price }});
    }

    if (filters.max_price) {
        dbFiltersAnd.push({price: {$lte: filters.max_price }});
    }

    dbFiltersAnd.push({name: /(.*?)/});

    return {
        dbFiltersAnd: dbFiltersAnd
    }
}


// search products by keyword and filter
exports.getProductByFilters = async (req, res) => {

    const filterConstraints = processFilter(req.body);
    let fullyMatch = [];
    let partialMatch = [];

    // search contains keyword and filter
    if (req.body.keyword) {
        const keywordConstraints = processSearchKeyword(req.body.keyword);
        fullyMatch = await Product
            .find()
            .or(keywordConstraints.fullyMatchConstraintOr)
            .and(filterConstraints.dbFiltersAnd)
            .populate('category');

        for (let i = 0; i < keywordConstraints.keywords.length; i++) {
            let constraintsAnd = []
            constraintsAnd.push(...filterConstraints.dbFiltersAnd);
            constraintsAnd.push(...keywordConstraints.partialMatchConstraintAnd[i]);
            // console.log(constraintsAnd);
            const resTemp = await Product
                .find()
                .or(keywordConstraints.partialMatchConstraintOr[i])
                .and(constraintsAnd)
                .populate('category');

            partialMatch.push(...resTemp);
        }
    } else { // only filter
        fullyMatch = await Product
            .find()
            .and(filterConstraints.dbFiltersAnd)
            .populate('category');
    }

    let match = []
    match.push(...fullyMatch);
    match.push(...partialMatch);
    match = removeDuplicates(match);

    // sorting, default is by relevance
    if (req.body.sort === 1) {
        match = _.sortBy(match, 'price');
    } else if (req.body.sort === -1) {
        match = _.sortBy(match, 'price').reverse();
    }

    const output = {
        match: match,
        success: true
    }

    res.status(200).send(output);
}


// search bidding products
exports.getBiddingProductByFilters = async (req, res) => {

    const filterConstraints = processFilter(req.body);
    let fullyMatch = [];
    let partialMatch = [];

    // search contains keyword and filter
    if (req.body.keyword) {
        const keywordConstraints = processSearchKeyword(req.body.keyword);
        fullyMatch = await BiddingProduct
            .find()
            .or(keywordConstraints.fullyMatchConstraintOr)
            .and(filterConstraints.dbFiltersAnd);

        for (let i = 0; i < keywordConstraints.keywords.length; i++) {
            let constraintsAnd = []
            constraintsAnd.push(...filterConstraints.dbFiltersAnd);
            constraintsAnd.push(...keywordConstraints.partialMatchConstraintAnd[i]);

            const resTemp = await BiddingProduct
                .find()
                .or(keywordConstraints.partialMatchConstraintOr[i])
                .and(constraintsAnd);

            partialMatch.push(...resTemp);
        }
    } else {
        fullyMatch = await BiddingProduct
            .find()
            .and(filterConstraints.dbFiltersAnd);
    }

    let match = []
    match.push(...fullyMatch);
    match.push(...partialMatch);
    match = removeDuplicates(match);

    // sorting, default is by relevance
    if (req.body.sort === 1) {
        match = _.sortBy(match, 'currentBidPrice');
    } else if (req.body.sort === -1) {
        match = _.sortBy(match, 'currentBidPrice').reverse();
    }

    const output = {
        match: match,
        success: true
    }

    res.status(200).send(output);
}

function removeDuplicates(arr) {
    let set = new Set();
    let res = [];
    for (const element of arr) {
        if (!set.has(element.name)) {
            res.push(element);
            set.add(element.name);
        }
    }
    return res;
}
