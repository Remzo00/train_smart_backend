import Joi from "joi";

export const createUserSchema = Joi.object({
    name: Joi.string().required(),
    surname: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    weight: Joi.number().required(),
    gender: Joi.string().valid('male', 'female').required()
});

export const updateUserSchema = Joi.object({
    name: Joi.string().optional(),
    surname: Joi.string().optional(),
    email: Joi.string().email().optional(),
    password: Joi.string().optional(),
    weight: Joi.number().optional(),
    gender: Joi.string().valid('male', 'female').optional(),
})