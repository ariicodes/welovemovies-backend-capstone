const service = require('./movies.service');
const asyncErrorBoundary = require('../errors/asyncErrorBoundary');

const movieExists = async (req, res, next) => {
	const { movieId } = req.params;
	const movie = await service.read(movieId);
	if (movie) {
		res.locals.movie = movie;
		return next();
	}
	return next({ status: 404, message: `Movie cannot be found.` });
};

////////////////////////////////

const list = async (req, res) => {
	const { is_showing } = req.query;
	const data = await service.list(is_showing);
	res.json({ data });
};

const read = async (req, res) => {
	const { movie } = res.locals;
	res.json({ data: movie });
};

const listMovieTheaters = async (req, res) => {
	const { movie } = res.locals;
	const theaters = await service.listMovieTheaters(movie.movie_id);
	res.json({ data: theaters });
};

const listMovieReviews = async (req, res) => {
	const { movie } = res.locals;
	const reviews = await service.listMovieReviews(movie.movie_id);
	res.json({ data: reviews });
};

module.exports = {
	list: asyncErrorBoundary(list),
	read: [movieExists, asyncErrorBoundary(read)],
	listMovieTheaters: [movieExists, asyncErrorBoundary(listMovieTheaters)],
	listMovieReviews: [movieExists, asyncErrorBoundary(listMovieReviews)],
};
