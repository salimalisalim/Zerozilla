const mongoose = require("mongoose");

const agencyShema = mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    address1: {
        type: String,
        require: true,
    },
    address2: {
        type: String,
    },
    state: {
        type: String,
        require: true,
    },
    city: {
        type: String,
        require: true,
    },
    phone: {
        type: Number,
        require: true
    }
},
    {
        timestamps: true,
    }
)


module.exports = mongoose.model("Agency", agencyShema);