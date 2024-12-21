const express = require('express');
const authRoute = require('./v1/user-route');
const router = express.Router();

router.use('/v1', authRoute);

module.exports = router;