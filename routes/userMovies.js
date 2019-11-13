const express = require('express');

const UserMoviesService = require('../services/userMovies');

const validationHandler = require('../utils/middleware/validationHandler');

const { movieIdSchema } = require('../utils/Schemas/movies');
const { userIdSchema } = require('../utils/Schemas/user');
const { createUserMovieSchema } = require('../utils/Schemas/movies');

const userMoviesApi = (app) => {
    const router = express.Router();

    app.use('/api/user-movies', router);

    const userMoviesService = new UserMoviesService();

    router.get('/', validationHandler({ userId: userIdSchema }, 'query'),
        async (req, res, next) => {
            const { userId } = req.params
            try {
                const userMovies = await userMoviesService.getUserMovies({ userId });
                res.status(200).json({
                    data: userMovies,
                    message: 'UserMovies listed'
                })
            } catch (err) {
                next(error);
            }
        })

    router.post('/', validationHandler(createUserMovieSchema), async (req, res, next) => {
        const { body: userMovie } = req;

        try {
            const createUserMovieId = await UserMoviesService.createUserMovieId({
                userMovie
            })

            res.status(201).json({
                data: createUserMovieId,
                message: 'User movie created'
            })

        } catch (err) {
            next(err);
        }
    })

    router.delete('/:userMovieId', validationHandler({ userMovieId: movieIdSchema }, 'params'), async (req, res, next) => {
        const { userMovieId } = req.params;
        
        try {
            const deletedMovieId = await userMoviesService.deleteUserMovie({ userMovieId });

            res.status(200).json({
                data: deletedMovieId,
                message: 'User movie deleted'
            })
        } catch (err) {
            next(err);
        }
    })


}

module.exports = userMoviesApi;