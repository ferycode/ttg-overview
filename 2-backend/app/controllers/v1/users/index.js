'use strict';

const express = require('express');
const router = express.Router();

router.get('/', require('./list'));
router.post('/', require('./create'));
router.put('/:id', require('./update'));
router.get('/:id', require('./detail'));
router.delete('/:id', require('./delete'));

module.exports = router;