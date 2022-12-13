const express = require('express');
const router = express.Router();
const Joi = require('joi');
const auth = require('../middleware/auth.js');
const authService = require('../services/Auth.service');

router.post('/authenticate',authorize);
router.post('/logout', LogoutClient);

module.exports = router;

async function authorize(req, res, next) {
   authService.authenticate(req.body).catch(next);
}

async function LogoutClient(req, res, next) {
  authService.Logout(req.body).catch(next);
}



function authenticateSchema(req, res, next)
{
    const schema = Joi.object({
        email: Joi.string().email().lowercase().required(),
        password: Joi.string().min(7).required().strict()
    });
    validateRequest(req, next, schema);
}
