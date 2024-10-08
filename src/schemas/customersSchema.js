import joi from "joi";

export const customersSchema = joi.object({
  name: joi.string().required(),
  phone: joi.string().required().min(10).max(11).pattern(/^\d+$/,`"only numbers"`),
  cpf: joi.string().required().length(11).pattern(/^\d+$/,`"only numbers"`)
})