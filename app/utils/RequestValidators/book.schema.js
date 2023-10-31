const Joi = require("joi");

const bookSchema = {
 bookAdd: Joi.object().keys({
    title: Joi.string().max(50).required(),
    author: Joi.string().max(50).required(),
    summary: Joi.string().allow(null, "").optional(),
    category: Joi.string().max(50).allow(null, "").optional(),
  }),

  bookEdit: Joi.object().keys({
    title: Joi.string().max(50).required(),
    author: Joi.string().max(50).required(),
    summary: Joi.string().allow(null, "").optional(),
    category: Joi.string().max(50).allow(null, "").optional(),
  }),

};
module.exports = bookSchema;