const express = require("express");
const router = express.Router();
const storesModel = require("../schemas/storeSchema");

router.get("/", function(req, res){
    console.log("Fetching all stores...");
    storesModel.find({})
        .then(stores => {
            res.status(200).send({
                stores
            })
        })
        .catch(err => {
            res.status(401).send({
                message: "Something went wrong trying to retrieve the available stores, please try again. We apologize for such inconvinience"
            })
        })
})

module.exports = router;