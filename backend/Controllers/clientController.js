const asyncHandler = require("express-async-handler");
const Client = require("../Models/clientModel");
const Agency = require("../Models/agencyModel");

// Create Client
exports.createClient = asyncHandler(async (req, res) => {

    const { name, email, phone, totalBill } = req.body
    // console.log(req.body)
    agencyId = req.body.agency.id

    const client = new Client({
        name,
        email,
        phone,
        totalBill,
        agencyId
    })

    const createdClient = await client.save();
    res.status(201).json({
        message: "Client details submitted successfully",
        createdClient
    })

})

// Update Client
exports.updateClient = asyncHandler(async (req, res) => {

    const client = await Client.findById(req.params.id);
    agencyId = req.body.agency.id


    if (client) {
        client.name = req.body.name;
        client.email = req.body.email;
        client.phone = req.body.phone;
        client.totalBill = req.body.totalBill;
        client.agencyId = agencyId;

        const updatedClient = await client.save();

        res.status(200).json({
            _id: updatedClient._id,
            name: updatedClient.name,
            email: updatedClient.email,
            phone: updatedClient.phone,
            totalBill: updatedClient.totalBill,
            agencyId: updatedClient.agencyId,
        })

    } else {
        res.status(400)
        throw new Error("Client not found");
    }

})

// Client with Max Bill
exports.getClientMaxBill = asyncHandler(async (req, res) => {

    await Client.find({}).populate({ path: "agencyId" }).sort({ totalBill: -1 }).limit(1)
        .then(data => {
            console.log(data);
            res.status(200).json({
                AgencyName: data[0].agencyId.name,
                ClientName: data[0].name,
                TotalBill: data[0].totalBill
            })
        })
        .catch(err =>
            res.status(400).json({
                error: err.message,
                message: "Failed"
            }));

})
