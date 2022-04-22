const express = require("express");
const { createClient, updateClient, getClientMaxBill } = require("../Controllers/clientController");

const router = express.Router();

router.route("/client/new").post(createClient);
router.route("/client/:id").put(updateClient);
router.route("/client/maxbill").get(getClientMaxBill);

module.exports = router