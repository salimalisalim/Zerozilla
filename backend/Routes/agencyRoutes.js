const express = require("express");
const { registerAgency, updateAgency, getAgency, deleteAgency } = require("../Controllers/agencyController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.route("/registeragency").post(registerAgency);
router.route("/agency/:id").put(updateAgency).get(getAgency).delete(deleteAgency);

module.exports = router;