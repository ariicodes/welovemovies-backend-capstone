if (process.env.USER) require('dotenv').config();
const express = require('express');
const cors = require('cors');

// Routers Imported
const moviesRouter = require('../src/movies/movies.router');
const reviewsRouter = require('../src/reviews/reviews.router');
const theatersRouter = require('../src/theaters/theaters.router');

// Error Handlers Imported
const errorHandler = require('./errors/errorHandler');
const notFound = require('./errors/notFound');

// Express App
const app = express();

// Middleware with empty options to allow all origins to make requests
app.use(cors());
// Middleware to parse the request body as JSON
app.use(express.json());

// Using Routes
app.use('/movies', moviesRouter);
app.use('/reviews', reviewsRouter);
app.use('/theaters', theatersRouter);

// Using the Error Handlers
app.use(notFound);
app.use(errorHandler);

module.exports = app;
