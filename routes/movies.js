const express = require('express');
const MoviesService = require('../services/movies');

function moviesApi(app) {
    const router = express.Router();
    const moviesService = new MoviesService();

    app.use('/api/movies', router);

    router.get('/', async (req, res, next) => {
        const { tags } = req.query
        try {
            const movies = await moviesService.getMovies({ tags });
            res.status(200).json({
                data: movies,
                message: 'movies listed'
            })
        } catch (error) {
            next(error);
        }
    })

    router.get('/:movieID', async (req, res, next) => {

        const { movieID } = req.params
        console.log(movieID)
        try {
            const movie = await moviesService.getMovie({ movieID });
            res.status(200).json({
                data: movie,
                message: 'movie retrieved'
            })
        } catch (error) {
            next(error);
        }
    })

    router.post('/', async (req, res, next) => {

        const { body: movie } = req;

        try {
            const createdMovieId = await moviesService.createMovie({ movie });
            res.status(201).json({
                data: createdMovieId,
                message: 'movie created'
            })
        } catch (error) {
            next(error);
        }
    })

    router.put('/:movieId', async (req, res, next) => {
        const {body: movie } = req;
        const { movieId } = req.params;
        try {
            const updatedMovieId = await moviesService.updateMovie({movieId, movie});
            res.status(200).json({
                data: updatedMovieId,
                message: 'movie updated'
            })
        } catch (error) {
            next(error);
        }
    })

    router.delete('/:movieId', async (req, res, next) => {
        try {
            const deletedMovieId = await Promise.resolve(moviesMock[0].id);
            res.status(200).json({
                data: deletedMovieId,
                message: 'movie deleted'
            })
        } catch (error) {
            next(error);
        }
    })
}

module.exports = moviesApi;