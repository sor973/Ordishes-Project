const express = require('express');
const router = express.Router();

const menuRouter = require("./menu");
const orderRouter = require("./order");
const urlRouter = require("./url");
const checktokenRouter = require("./checktoken");
const checkoutRouter = require("./checkout");
const orderlistRouter = require("./orderlist");
const tableRouter = require("./table");

router.get('/', (res,req) => {
    res.setEncoding("Welcome To Back_End Node.js");
})

router.use('/menu',menuRouter);
router.use('/order',orderRouter);
router.use('/url',urlRouter);
router.use('/checkout',checkoutRouter);
router.use('/checktoken',checktokenRouter);
router.use('/orderlist',orderlistRouter);
router.use('/table',tableRouter);

module.exports = router;
