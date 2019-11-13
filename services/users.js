const MongoLib = require('../lib/mongo');
const bcrypt = require('bcrypt');

class UserService {

    constructor(){
        this.collection = 'users';
        this.mongodb = new MongoLib();
    }

    async getUser({ email }){
        const [ user ] = await this.mongodb.getAll(this.collection, { email });
        return user;
    }

    async createUser({ user }){
        const { name, email, password } = user;
        const hashedPassword = await bcrypt.hash(password, 10);

        const createdUserId = await this.mongodb.create(this.collection, {
            name,
            email,
            password: hashedPassword
        });
        return createdUserId;
    }
    
}

module.exports = UserService;