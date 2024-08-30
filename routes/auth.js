const express = require("express");
const router = express.Router();
const { register, login, updateUser } = require("../controllers/auth");
const authenticateUser = require("../middleware/authentication");
const testUser = require("../middleware/testuser");
const rateLimiter = require('express-rate-limit');

const apiLimiter = rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 3, // limit each IP to 100 requests per windowMs
    message: {
        msg: "Too many requests from this IP, please try again later",
    }
});

router.post("/register",apiLimiter, register);
router.post("/login", apiLimiter, login);
router.patch("/updateUser", authenticateUser, testUser, updateUser);

module.exports = router;
