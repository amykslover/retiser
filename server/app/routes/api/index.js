const router = require("express").Router();
const userRoutes = require("./users");
const accountRoutes = require("./account");

router.use("/users", userRoutes);

// router.use("/account", accountRoutes);

module.exports = router;