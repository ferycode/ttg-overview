'use strict';

const joi = require('joi');
const db = require(__base + 'app/models');
const response = require(__base + 'lib/common/response');

module.exports = async (req, res, next) => {
  const schema = joi.object().keys({
    email: joi.string().optional().allow(null, ''),
    name: joi.string().optional().allow(null, ''),
    phone: joi.string().optional().allow(null, ''),
    address: joi.string().optional().allow(null, ''),
    page: joi.number().integer().min(1).default(1),
    perPage: joi.number().integer().min(1).default(50)
  });

  try {
    const params = joi.attempt(req.query, schema, { stripUnknown: true });
    const conditions = {};

    if (params.email) {
      conditions.email = { [db.Sequelize.Op.like]: `%${params.email}%` };
    }
    if (params.name) {
      conditions.name = { [db.Sequelize.Op.like]: `%${params.name}%` };
    }
    if (params.phone) {
      conditions.phone = { [db.Sequelize.Op.like]: `%${params.phone}%` };
    }
    if (params.address) {
      conditions.address = { [db.Sequelize.Op.like]: `%${params.address}%` };
    }

    const { count, rows } = await db.User.findAndCountAll({
      where: conditions,
      offset: (params.page - 1) * params.perPage,
      limit: params.perPage,
    });
    
    return response.json(res, 200)({
      data: rows,
      count,
    });
  } catch (error) {
    next(error);
  }
}

