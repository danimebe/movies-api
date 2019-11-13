const MongoLib = require('../lib/mongo');

class UserMoviesService {
    constructor() {
        this.collection = 'user-movies';
        this.mongodb = new MongoLib();
    }

    async getUserMovies({ userId }) {
        const query = userId && { userId };
        const userMovies = await this.mongodb.getAll(this.collection, query);
        return userMovies || [];
    }

    async createUserMovie({ userMovie }) {
        const createdUserMovieId = await this.mongodb.create(this.collection, userMovie);
    }

    async deleteUserMovie({ userMovieId }) {
        const deletedUserMovieId = await this.mongodb.delete(this.collection, userMovieId);
        return deletedUserMovieId;
    }
}

module.exports = UserMoviesService;