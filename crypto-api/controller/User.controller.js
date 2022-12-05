const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('middleware/validate-request');
const Role = require('helper/role');
const userService = require('../services/User.service');

// routes 

router.get('/', getAll);
router.get('/:id', getById);
router.post('/create', createSchema, create);
router.put('/update/:id', updateSchema, update);
router.delete('/delete/:id', _delete);

module.exports = router;

// function 

function getAll(req, res, next)
{
    userService.getAll()
        .then(users => res.json(users))
        .catch(next);
}

function getById(req, res, next)
{
    userService.getById(req.params.id)
        .then(user => res.json(user))
        .catch(next);
}

function create(req, res, next)
{
    userService.create(req.body).then(() => res.json({message: 'User created'})).catch(next);
}

function login(req, res, next)
{
    userService.login(req.body).then(() => res.json({message: 'User logged'})).catch(next);
}

function update(req, res, next)
{
    userService.update(req.params.id, req.body)
        .then(() => res.json({ message: 'User updated' }))
        .catch(next);
}

function _delete(req, res, next)
{
    userService.delete(req.params.id)
        .then(() => res.json({ message: 'User deleted' }))
        .catch(next);
}

// schema grace au module joi

function createSchema(req, res, next)
{
    const schema = Joi.object({
        username: Joi.string().required(),
        email: Joi.string().email().lowercase().required(),
        password: Joi.string().min(7).required().strict(),
        confirmPassword: Joi.string().valid(Joi.ref('password')).required().strict()
    });
    validateRequest(req, next, schema);
}

function updateSchema(req, res, next)
{
    const schema = Joi.object({
        username: Joi.string().empty(''),
        email: Joi.string().email().lowercase().required(), 
        password: Joi.string().min(7).required().strict(),
        confirmPassword: Joi.string().valid(Joi.ref('password')).required().strict()
    });
    validateRequest(req, next, schema);
}

function authDataSchema(req, res, next)
{
    const schema =  Joi.object({
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().min(7).required().strict(),
    confirmPassword: Joi.string().valid(Joi.ref('password')).required().strict(),
    });
    validateRequest(req, next, schema);
}