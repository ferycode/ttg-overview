'use strict';

const joi = require('joi');
const { omit } = require('lodash');
const db = require(__base + 'app/models');
const response = require(__base + 'lib/common/response');

module.exports = async (req, res, next) => {
  const schema = joi.object().keys({
    name: joi.string().optional().allow(null, ''),
    phone: joi.string().optional().allow(null, ''),
    address: joi.string().optional().allow(null, ''),
  });

  try {
    const params = joi.attempt(req.body, schema, { stripUnknown: true });
    const user = await db.User.findByPk(req.params.id);

    if (!user) {
      throw new Error('User not found');
    }

    await user.update(params);
    await user.reload();

    return response.json(res, 200)({
      success: true,
      data: omit(user.toJSON(), ['password']),
    });
  } catch (error) {
    next(error);
  }
}