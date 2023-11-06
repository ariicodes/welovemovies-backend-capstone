const knex = require('../db/connection');
const mapProperties = require('../utils/map-properties');

const addCritic = mapProperties({
	critic_id: 'critic.critic_id',
	preferred_name: 'critic.preferred_name',
	surname: 'critic.surname',
	organization_name: 'critic.organization_name',
	created_at: 'critic.created_at',
	updated_at: 'critic.updated_at',
});

const list = isShowing => {
	return isShowing === true
		? knex('movies as m')
				.select('m.*')
				.join('movies_theaters as mt', 'm.movie_id', 'mt.movie_id')
				.where({ 'mt.is_showing': isShowing })
				.first()
		: knex('movies').select('*');
};

const read = movieId => {
	return knex('movies').select('*').where({ movie_id: movieId }).first();
};

const listMovieTheaters = movieId => {
	return knex('theaters as t')
		.join('movies_theaters as mt', 't.theater_id', 'mt.theater_id')
		.select('t.*', 'mt.is_showing', 'mt.movie_id')
		.where({ 'mt.movie_id': movieId, 'mt.is_showing': true });
};

const listMovieReviews = movieId => {
	return knex('reviews as r')
		.join('critics as c', 'c.critic_id', 'r.critic_id')
		.select('r.*', 'c.*')
		.where({ 'r.movie_id': movieId })
		.then(reviews => {
			return reviews.map(review => addCritic(review));
		});
};

module.exports = {
	list,
	read,
	listMovieTheaters,
	listMovieReviews,
};
