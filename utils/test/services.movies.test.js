const assert = require('assert');
const proxyquire = require('proxyquire');

const { MongoLibMock, getAllStub } = require('../mocks/mongoLib');
const { moviesMock } = require('../mocks/movies');

describe('services - movies', () => {
    const MoviesService = proxyquire('../../services/movies', {
        '../lib/mongo': MongoLibMock
    });

    const moviesService = new MoviesService();

    describe("When getMovies method is called", async function () {
        it("Should call the getall mongoLib method", async () => {
            await moviesService.getMovies({});
            assert.strictEqual(getAllStub.called, true);
        })

        it("Should return an array of movies", async () => {
            const result = await moviesService.getMovies({});
            const expected = moviesMock;
            assert.deepEqual(result, expected);
        })
    });
})