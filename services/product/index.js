const express = require('express');
const app = express();
const { json } = require("body-parser");

const { getClient } = require('./mongo-service');

app.use(json());

app.use(async (req, res, next) => {
    const client = await getClient();
    const db = await client.db();
    req.db = db.collection('products');
    next();
})

app.post('/products', async (req, res) => {
    try {
        const { products } = req.body;

        await req.db.insertMany(products);
        res.send();

    } catch (e) {
        res.status(500).send();
    }
})

app.get('/products/:category', async (req, res) => {
    try {
        const { category } = req.params;
        const product = await req.db.find({ category }).toArray();
        res.json(product);
    } catch (e) {
        console.log(e);
        res.status(500).send();
    }
})

app.get('/products', async (req, res) => {
    try {
    const products = await req.db.find().toArray();
    res.send(products);
    } catch (e) {
        res.status(500).send();
    }
})

app.get('/products/page/:page/size/:size', async (req, res) => {
    try {
    const {page, size} = req.params;
    const index = (page-1) * size;
    const products = await req.db.find().skip(index).limit(+size).toArray();
    res.send(products);
    } catch (e) {
        res.status(500).send();
    }
})

app.listen(3000, function () {

})