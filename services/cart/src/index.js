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
    req.db = db.collection('cart');
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
app.post('/all', async (req, res) => {
    try {
        const { carts } = req.body;

        await req.db.insertMany(carts);
        res.send();

    } catch (e) {
        res.status(500).send();
    }
})

app.get('/:sessionId', async (req, res) => {
    try {
        const { sessionId } = req.params;
        const cart = await req.db.find({ sessionId }).toArray();
        res.json(cart);
    } catch (e) {
        console.log(e);
        res.status(500).send();
    }
})

app.post('/', async (req, res) => {
    try {
        const { cart } = req.body;
        await req.db.insert(cart);
        res.send();
    } catch (e) {
        res.status(500).send();
    }
})

app.listen(8080, function () {
    console.log('listening on 8080');
})