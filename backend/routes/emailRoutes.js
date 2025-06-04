const express = require("express");
const router = express.Router();
const { syncEmails, searchEmails } = require("../controllers/emailController");

router.post("/sync", syncEmails);           // To sync and index emails
router.get("/search", searchEmails);         // To search emails by query, folder, and account

module.exports = router;




