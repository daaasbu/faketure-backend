require("dotenv").config();

const express = require('express');
const app = express();
const cors = require('cors');
const { json } = require("body-parser");


const { getClient } = require('./mongo-service');
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


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
app.post('/cart/all', async (req, res) => {
    try {
        const { carts } = req.body;

        await req.db.insertMany(carts);
        res.send();

    } catch (e) {
        res.status(500).send();
    }
})

app.get('/cart/:sessionId', async (req, res) => {
    try {
        const { sessionId } = req.params;
        const cart = await req.db.find({ sessionId }).toArray();
        res.json(cart);
    } catch (e) {
        console.log(e);
        res.status(500).send();
    }
})

app.post('/cart', async (req, res) => {
    try {
        const { item } = req.body;
        await req.db.update({ _id: item.requestId }, { ...item, _id: item.requestId }, { upsert: true });
        res.send();
    } catch (e) {
        res.status(500).send();
    }
})

app.listen(8080, function () {
    console.log('listening on 8080');
})