'use strict';

const joi = require('joi');
const db = require(__base + 'app/models');
const response = require(__base + 'lib/common/response');

module.exports = async (req, res, next) => {
  const schema = joi.object().keys({
    email: joi.string().email().required(),
    name: joi.string().optional().allow(null, ''),
    phone: joi.string().optional().allow(null, ''),
    address: joi.string().optional().allow(null, ''),
  });

  try {
    const params = joi.attempt(req.body, schema, { stripUnknown: true });
    const emailExist = await db.User.findOne({ 
      where: { email: params.email },
      attributes: ['email'],
      raw: true,
    });

    if (emailExist) {
      throw new Error('Email already exist');
    }
  
    const user = await db.User.create(params);

    if (!user) {
      throw new Error('Failed to create user');
    }

    return response.json(res, 200)({
      success: true,
      data: user
    });
  } catch (error) {
    next(error);
  }
};
