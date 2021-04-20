const express = require("express");
const router = express.Router();
const storesModel = require("../schemas/storeSchema");


router.get("/foodSort", function(req, res){
    //console.log(req.query);
    console.log("Sorting by food...");

    /*
        We have to build our query dynamically because we do not want to include the area if it isn't provided by the clilent, 
    */

    //This holds the value we wana search
    regEx = { "$regex": req.query.value, "$options": "i" }

    //Create each query variable and initialize them to empty objects
    var [query1, query2, query3] = [{}, {}, {}];

    /*
        Because the final or query would have three field object, enclose the keys in an array so we can loop through them
    */
    fieldArray = ["offers.local.name", "offers.snack.name", "offers.continental.name"];

    //This is the  finaly query array that holds the other three objects
    orQuery = [query1, query2, query3]  

    /*
        Loop through the fields dynamically adding each field:value as you loop, and based on whether the area:value is supplied add/omit it
    */

    for(let i=0;i<fieldArray.length;i++){
        orQuery[i][fieldArray[i]] = regEx
        orQuery[i]["address.state"] = req.query.state
        if(req.query.area != undefined){
            orQuery[i]["address.area"] = req.query.area
        }
    }


    storesModel.find({
        "$or": orQuery
    })
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
