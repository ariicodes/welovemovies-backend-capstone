const service = require('./theaters.service');
const asyncErrorBoundary = require('../errors/asyncErrorBoundary');

const list = async (req, res) => {
	const data = await service.list();
	res.json({ data });
};

module.exports = { list: asyncErrorBoundary(list) };
