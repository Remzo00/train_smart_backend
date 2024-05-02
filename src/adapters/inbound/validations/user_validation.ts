import Joi from "joi";

export const userSchema = Joi.object({
    name: Joi.string().required(),
    surname: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    weight: Joi.number().required(),
    gender: Joi.string().valid('male', 'female').required()
});