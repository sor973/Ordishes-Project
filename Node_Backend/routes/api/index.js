const express = require('express');
const router = express.Router();

const menuRouter = require("./menu");
const orderRouter = require("./order");
const urlRouter = require("./url");
const checktokenRouter = require("./checktoken");
const checkoutRouter = require("./checkout");

router.get('/', (res,req) => {
    res.setEncoding("Welcome To Back_End Node.js");
})

router.use('/menu',menuRouter);
router.use('/order',orderRouter);
router.use('/url',urlRouter);
router.use('/checkout',checkoutRouter);
router.use('/checktoken',checktokenRouter);

module.exports = router;
