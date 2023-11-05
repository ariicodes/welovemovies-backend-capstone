const knex = require('../db/connection');

const read = reviewId => {
	return knex('reviews').select('*').where({ review_id: reviewId }).first();
};

const destroy = reviewId => {
	return knex('reviews').where({ review_id: reviewId }).del();
};

const update = updatedReview => {
	return knex('reviews')
		.select('*')
		.where({ review_id: updatedReview.review_id })
		.update(updatedReview, '*')
		.then(updatedRecords => updatedRecords[0]);
};

const getCriticById = criticId => {
	return knex('critics').where({ critic_id: criticId }).first();
};

module.exports = {
	read,
	delete: destroy,
	update,
	getCriticById,
};
