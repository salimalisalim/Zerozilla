const asyncHandler = require("express-async-handler");
const generateToken = require("../utils/generateToken");
const Agency = require("../Models/agencyModel");

// Register Agency
exports.registerAgency = asyncHandler(async (req, res) => {

    const { name, address1, address2, state, city, phone } = req.body

    const agencyExists = await Agency.findOne({ $or: [{ name }, { phone }] })

    if (agencyExists) {
        res.status(400)
        throw new Error('User agency exists')
    }

    const agency = await Agency.create({
        name,
        address1,
        address2,
        state,
        city,
        phone
    })

    if (agency) {

        token = generateToken(agency._id);

        res.status(201).cookie("token", token).json({
            _id: agency._id,
            name: agency.name,
            address1: agency.address1,
            address2: agency.address2,
            state: agency.state,
            city: agency.city,
            phone: agency.phone,
            token,
        })
    } else {
        res.status(400)
        throw new Error('Invalid agency data')
    }
})

// Update agency
exports.updateAgency = asyncHandler(async (req, res) => {

    const agency = await Agency.findById(req.params.id);

    if (agency) {
        agency.name = req.body.name;
        agency.address1 = req.body.address1;
        agency.address2 = req.body.address2;
        agency.state = req.body.state;
        agency.city = req.body.city;
        agency.phone = req.body.phone;

        const updatedAgency = await agency.save();

        res.status(200).json({
            _id: updatedAgency._id,
            name: updatedAgency.name,
            address1: updatedAgency.address1,
            address2: updatedAgency.address2,
            state: updatedAgency.state,
            city: updatedAgency.city,
            phone: updatedAgency.phone
        })

    } else {
        res.status(400)
        throw new Error("Agency not found");
    }
})

// Get agency details
exports.getAgency = asyncHandler(async (req, res) => {

    const agency = await Agency.findById(req.params.id);

    if (agency) {
        res.status(200).json({
            agency
        })
    } else {
        res.status(400)
        throw new Error("Agency not found")
    }

})

// Delete Agency
exports.deleteAgency = asyncHandler(async (req, res) => {

    const agency = await Agency.findById(req.params.id);

    if (agency) {
        await agency.remove()
        res.json({ message: 'Agency removed' })
    } else {
        res.status(404)
        throw new Error('Agency not found')
    }


})