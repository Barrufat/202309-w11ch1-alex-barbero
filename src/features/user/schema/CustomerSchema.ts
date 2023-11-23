import Joi from "joi";
import { type UserDataStructure } from "../types";
import { validate } from "express-validation";

const customerSchema = {
  body: Joi.object<UserDataStructure>({
    name: Joi.string().required(),
    password: Joi.string().required(),
    username: Joi.string().required(),
  }),
};

export const customerValidation = validate(
  customerSchema,
  {},
  { abortEarly: false },
);
