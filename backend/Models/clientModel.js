const mongoose = require("mongoose");

const clientSchema = mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: Number,
        require: true
    },
    totalBill: {
        type: Number,
        require: true
    },
    agencyId: {
        type: mongoose.Schema.ObjectId,
        ref: "Agency",
        required: true,
    },
},
    {
        timestamps: true,
    }
)

module.exports = mongoose.model("Client", clientSchema);