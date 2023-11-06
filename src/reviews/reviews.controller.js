const service = require('./reviews.service');
const asyncErrorBoundary = require('../errors/asyncErrorBoundary');

const reviewExists = async (req, res, next) => {
	const { reviewId } = req.params;
	const review = await service.read(reviewId);

	if (review) {
		res.locals.review = review;
		return next();
	}
	next({
		status: 404,
		message: 'Review cannot be found.',
	});
};

const destroy = async (req, res) => {
	const { review } = res.locals;
	await service.delete(review.review_id);
	res.sendStatus(204);
};

const update = async (req, res) => {
	const { review } = res.locals;

	const updatedReview = {
		...review,
		...req.body.data,
	};

	await service.update(updatedReview);
	const critic = await service.getCriticById(updatedReview.critic_id);

	res.json({ data: { ...updatedReview, critic } });
};

module.exports = {
	delete: [reviewExists, asyncErrorBoundary(destroy)],
	update: [reviewExists, asyncErrorBoundary(update)],
};
