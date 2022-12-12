const express = require('express');
const router = express.Router();
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const config = require('../config.json')
const db = require('../helper/db');

router.post('/authenticate', authDataSchema, authenticate);
module.exports =  router;

async function authenticate( email, password){
    const user =  await db.Users.findOne({ where: { email: email } });
    if (user && bcrypt.compareSync(password, user.password))
    {
        const { password, ...userWithoutPassword } = user;
        const token = jwt.sign({ sub: user.id }, config.secret);
        return {
            ...userWithoutPassword,
            token
        };
    } else {
        console.log("User not found");
    }

}

function authDataSchema(req, res, next)
{
    const schema =  Joi.object({
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().min(7).required().strict()
    });
    validateRequest(req, next, schema);
}

