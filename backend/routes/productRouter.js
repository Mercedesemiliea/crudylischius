const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const productsFilePath = path.join(__dirname, '../data/products.json');

router.get('/', (req, res) => {
    const data = fs.readFileSync(productsFilePath);
    const products = JSON.parse(data);
    res.json(products);
});

router.post('/', (req, res) => {
    const data = fs.readFileSync(productsFilePath);
    const products = JSON.parse(data);
    const newProduct = {
        id: products.length + 1,
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        image: req.body.image || ''
    };
    products.push(newProduct);
    fs.writeFileSync(productsFilePath, JSON.stringify(products));
    res.status(201).json(newProduct);
});

module.exports = router;
