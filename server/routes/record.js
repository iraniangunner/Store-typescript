// const { response } = require("express");
const express = require("express");
const recordRoutes = express.Router();
const dbo = require("../db/conn");
const ObjectId = require("mongodb").ObjectId;
var mongoose = require("mongoose");
var fs = require("fs");
require("dotenv").config("./env");

//Get list of records
recordRoutes.route("/allusers").get(function (req, res) {
  let db_connect = dbo.getDb("shop");
  db_connect
    .collection("users")
    .find({})
    .toArray(function (error, result) {
      if (error) throw error;
      res.json(result);
    });
});

//Get list of records
recordRoutes.route("/allProducts").get(function (req, res) {
  let db_connect = dbo.getDb("shop");
  db_connect
    .collection("products")
    .find({})
    .toArray(function (error, result) {
      if (error) throw error;
      res.json(result);
    });
});

recordRoutes.route("/getItem/:id").get(function (req, res) {
  let db_connect = dbo.getDb("shop");
  let myquery = { _id: ObjectId(req.params.id) };
  console.log(req.params.id);
  db_connect
    .collection("products")
    .find(myquery)
    .toArray(function (error, result) {
      if (error) throw error;
      res.json(result);
    });
});

recordRoutes.route("/get/:email").get(function (req, res) {
  let db_connect = dbo.getDb("shop");
  let myquery = { email: req.params.email };
  console.log(req.params.email);
  db_connect
    .collection("users")
    .find(myquery)
    .toArray(function (error, result) {
      if (error) throw error;
      res.json(result);
    });
});

recordRoutes.route("/getBasket/:email").get(function (req, res) {
  let db_connect = dbo.getDb("shop");
  let myquery = { email: req.params.email };
  db_connect.collection("users").findOne(myquery, function (err, result) {
    if (err) throw err;
    res.json(result.basket);
  });
});

recordRoutes.route("/getOne/:email").get(function (req, res) {
    let db_connect = dbo.getDb("shop");
    let myquery = { email: req.params.email };
    db_connect.collection("users").findOne(myquery, function (err, result) {
      if (err) throw err;
      res.json(result);
    });
  });

recordRoutes.route("/addBasket/:email").post(function (req, res) {
  let db_connect = dbo.getDb("shop");
  let myquery = { email: req.params.email };
  let basket = req.body.basket;
//   return
  db_connect.collection("users").findOne(myquery, function (err, result) {
    if (err) throw err;
    const user = JSON.stringify(result);
    console.log(user.email)
    return
    const obj = {
      $set: {
        email: user.email,
        username: user.username,
        password: user.password,
        products: user.products,
        basket: basket,
      },
    };
    db_connect
      .collection("users")
      .updateOne(myquery, obj, function (err, res1) {
        if (err) throw err;
        console.log("1 document updated");
        res.json(res1);
      });
  });
});



recordRoutes.route("/signup").post(function (req, response) {
  let db_connect = dbo.getDb();

  let myobj = {
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
    products: req.body.products,
    basket: req.body.basket,
  };
  db_connect.collection("users").insertOne(myobj, function (err, res) {
    if (err) throw err;
    response.json(res);
  });
});

recordRoutes.route("/create").post(function (req, response) {
  let db_connect = dbo.getDb();

  let myobj = {
    productDesc: req.body.productDesc,
    productPrice: req.body.productPrice,
    productTitle: req.body.productTitle,
    terms: req.body.terms,
    files: req.body.files,
    owner: req.body.owner,
  };
  db_connect.collection("products").insertOne(myobj, function (err, res) {
    if (err) throw err;
    response.json(res);
  });
});

module.exports = recordRoutes;
