import dotenv from 'dotenv';
dotenv.config()

const config = {
    mongoose: process.env.MONGOOSE_ENV,
    mongoUrl: process.env.MONGOURL_ENV
}

export default config;