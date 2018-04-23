const Joi = require('joi')

exports.validate = function (song) {
  const shema = {
    title: Joi.string().min(3).required(),
    artist: Joi.string().min(5).required()
  }

  return Joi.validate(song, shema)
}
