const Joi = require('joi')

exports.validate = function (course) {
  const shema = {
    name: Joi.string().min(3).required()
  }

  return Joi.validate(course, shema)
}
