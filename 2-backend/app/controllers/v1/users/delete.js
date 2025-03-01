'use strict';

const db = require(__base + 'app/models');
const response = require(__base + 'lib/common/response');

module.exports = async (req, res, next) => {
  try {
    const user = await db.User.findByPk(req.params.id);

    if (!user) {
      throw new Error('User not found');
    }

    await user.destroy();

    return response.json(res, 200)({
      success: true
    });
  } catch (error) {
    next(error);
  }
}
