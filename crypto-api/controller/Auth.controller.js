const express = require('express');
const router = express.Router();
const authService = require('../services/Auth.service');

// routes
router.post('/', authenticate);

module.exports = router;

async function authenticate(req, res, next)
{
    authService.signin(req.body)
    .then(user=> res.json(user))
    .catch(next);
}
