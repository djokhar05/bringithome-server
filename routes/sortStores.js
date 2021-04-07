const express = require("express");
const router = express.Router();
const storesModel = require("../schemas/storeSchema");

const executeSearch = () => {
    storesModel.find({"address.state": state})
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
}

router.get("/sortStores", function(req, res){
    console.log("Fetching sorted stores");

    //console.log(req.query);

    var { page, limit, state } = req.query;
    //the skip variable is the offset which mongoose has to skip depending on the page the user is on.
    //First it checks if the page is page 1, if it is, it returns zero so mongoose doesn't skip any data.
    //If the page is not 1
    page = Array.isArray(req.query.page) ? req.query.page.pop() : req.query.page;
    limit = Array.isArray(req.query.limit) ? req.query.page.pop() : req.query.limit;

    limit = parseInt(req.query.limit) || 10;

    const skip = page == 1 ? 0 : limit*(page-1)

    var findQuery = {}

    if(req.query.state != undefined){
        findQuery = {
             "address.state":
             Array.isArray(req.query.state) ? req.query.state.pop() : req.query.state
        }
    }

    if(req.query.area != undefined){
        findQuery = {
            ...findQuery,
            "address.area":
            Array.isArray(req.query.area) ? req.query.area.pop() : req.query.area
        }
    }

    // if(req.query.food != undefined){
    //     findQuery = {
    //         ...findQuery,
    //         "address.area": req.query.area
    //     }
    // }

    console.log(findQuery);
    console.log(limit, page);

    storesModel.find(findQuery)
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
