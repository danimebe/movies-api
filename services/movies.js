const MongoLib = require('../lib/mongo');

class MoviesService {

    constructor() {
        this.collection = 'movies';
        this.mongoDB = new MongoLib();
    }

    async getMovies({ tags }) {

        const query = tags && { tags: { $in: tags } };

        const movies = await this.mongoDB.getAll(this.collection, query);
        return movies || [];
    }

    async getMovie({ movieID }) {
        console.log(movieID)
        const movie = await this.mongoDB.get(this.collection, movieID);
        return movie || {};
    }

    async createMovie({ movie }) {
        const createMovieId = await this.mongoDB.create(this.collection, movie);
        return createMovieId;
    }

    async updateMovie({ movieId, movie } = {}) {
        const updatedMovieId = await this.mongoDB.update(this.collection, movieId, movie);
        return updatedMovieId;
    }

    async deleteMovie() {
        const deletedMovieId = await Promise.resolve(moviesMock[0].id);
        return deletedMovieId;
    }
}

module.exports = MoviesService