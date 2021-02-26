const express = require("express");
const router = express.Router();
const storesModel = require("../schemas/storeSchema");

router.get("/:page/:limit", function(req, res){

    console.log(req.params)

    console.log("Fetching all stores...");
    const limit = parseInt(req.params.limit) || 10;
    const page = parseInt(req.params.page);

    //the skip variable is the offset which mongoose has to skip depending on the page the user is on.
    //First it checks if the page is page 1, if it is, it returns zero so mongoose doesn't skip any data.
    //If the page is not 1
    const skip = page == 1 ? 0 : limit*(page-1)

    console.log(skip);
    storesModel.find({})
        .skip(skip)
        .limit(limit)
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