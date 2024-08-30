require('dotenv').config();
const connectDB  = require('../db/connect');
const Job = require('../models/Job');
const mockData = require('../mocks/jobs.json');


const start = async () => {
    try {
        connectDB(process.env.MONGO_URI);
        await Job.deleteMany();
        await Job.create(mockData);
        console.log('Data successfully loaded');
    } catch (error) {
        console.log(error);
        process.exit(1);
    }

    process.exit(0);
}
start();