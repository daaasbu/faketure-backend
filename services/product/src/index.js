require("dotenv").config();

const express = require('express');
const app = express();
const { json } = require("body-parser");


const { getClient } = require('./mongo-service');

app.use(json());

app.use(async (req, res, next) => {
    try {
    const client = await getClient();
    const db = await client.db();
    req.db = db.collection('products');
    next();
    } catch (e) {
        console.log(e);
    }
})

app.get('/alive', async (req, res) => {
    res.send();
})

app.get('/ready', async (req, res) => {
    res.send();
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

app.listen(8080, function () {
    console.log('listening on 8080');
})