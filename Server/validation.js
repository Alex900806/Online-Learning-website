const Joi = require("joi");

//註冊
const registerValidation = (data) => {
  const schema = Joi.object({
    username: Joi.string().min(3).max(10).required(),
    email: Joi.string().min(6).max(20).required().email(),
    password: Joi.string().min(6).max(255).required(),
    role: Joi.string().valid("student", "instructor"),
  });
  return schema.validate(data);
};

//登入
const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().min(6).max(20).required().email(),
    password: Joi.string().min(6).max(255).required(),
  });
  return schema.validate(data);
};

//新增課程
const courseValidation = (data) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().required(),
  });
  return schema.validate(data);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.courseValidation = courseValidation;
