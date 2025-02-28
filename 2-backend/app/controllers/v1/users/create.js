'use strict';

const joi = require('joi');
const bcrypt = require('bcryptjs');
const { omit } = require('lodash');
const db = require(__base + 'app/models');
const response = require(__base + 'lib/common/response');

module.exports = async (req, res, next) => {
  const schema = joi.object().keys({
    email: joi.string().email().required(),
    password: joi.string().min(6).optional(),
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

    let password = null;
    if (params.password) {
      password = await bcrypt.hash(params.password, 10);
    }

    const user = await db.User.create({ ...params, password});

    if (!user) {
      throw new Error('Failed to create user');
    }

    return response.json(res, 200)({
      success: true,
      data: omit(user.toJSON(), ['password']),
    });
  } catch (error) {
    next(error);
  }
};
