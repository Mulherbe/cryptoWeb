const express = require('express');
const router = express.Router();
const Joi = require('joi');
const auth = require('../middleware/auth.js');
const authService = require('../services/Auth.service');

router.post('/authenticate',authenticateSchema, authorize);
router.post('/logout', LogoutClient);

module.exports = router;

async function authorize(req, res, next) {
    try {
        const { email, password } = req.body;
        const user = await authService.authenticate({ email, password });
        res.json(user);
    } catch (err) {
        next(err);
    }
}

async function LogoutClient(req, res, next) {
    try {
        const { email, password } = req.body;
        const user = await authService.Logout({ email, password });
        res.json(user);
    } catch (err) {
        next(err);
    }
}



function authenticateSchema(req, res, next)
{
    const schema = Joi.object({
        email: Joi.string().email().lowercase().required(),
        password: Joi.string().min(7).required().strict()
    });
    validateRequest(req, next, schema);
}
