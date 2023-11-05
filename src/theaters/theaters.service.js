const knex = require('../db/connection');
// const mapProperties = require('../utils/map-properties');
const reduceProperties = require('../utils/reduce-properties');

// const addMovies = mapProperties({
// 	movie_id: 'movies.movie_id',
// 	title: 'movies.title',
// 	runtime_in_minutes: 'movies.runtime_in_minutes',
// 	rating: 'movies.rating',
// 	description: 'movies.description',
// 	image_url: 'movies.image_url',
// 	created_at: 'movies.created_at',
// 	updated_at: 'movies.created_at',
// 	is_showing: 'movies.is_showing',
// 	theater_id: 'movies.theater_id',
// });

const reduceTheatersAndMovies = reduceProperties('theater_id', {
	movie_id: ['movies', null, 'movie_id'],
	title: ['movies', null, 'title'],
	runtime_in_minutes: ['movies', null, 'runtime_in_minutes'],
	rating: ['movies', null, 'rating'],
	description: ['movies', null, 'description'],
	image_url: ['movies', null, 'image_url'],
	created_at: ['movies', null, 'created_at'],
	updated_at: ['movies', null, 'updated_at'],
	is_showing: ['movies', null, 'is_showing'],
});

const list = () => {
	return (
		knex('theaters as t')
			.join('movies_theaters as mt', 't.theater_id', 'mt.theater_id')
			.join('movies as m', 'm.movie_id', 'mt.movie_id')
			.select('*')
			// .then(theaters => theaters.map(theater => addMovies(theater)));
			.then(reduceTheatersAndMovies)
	);
};

module.exports = { list };
