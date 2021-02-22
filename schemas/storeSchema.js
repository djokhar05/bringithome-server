const mongoose = require("mongoose");

const storesSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phone: [{
        type: String,
        required: true
    }],
    currency: {
        type: String,
        required: true
    },
    address: {
        street: {
            type: String,
            required: true
        },
        busStop: {
            type: String,
            required: true
        },
        area: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true
        },
        country: {
            type: String,
            required: true
        }
    },
    offers: {
        local: [
            {
                name: String,
                image: String,
                price: String,
            }
        ],
        snack: [
            {
                name: String,
                image: String,
                price: String,
            }
        ],
        continental: [
            {
                name: String,
                image: String,
                price: String,
            }
        ]
    }
}, {minimize: false});

const storesModel = mongoose.model("stores", storesSchema);

module.exports = storesModel;