export default () => ({
    port: parseInt(process.env.PORT || '3000', 10),
    database: {
        uri: process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/job_application',
    },
    cors: {
        origins: [
            'http://localhost:3000',
            'http://localhost:3001',
            'http://localhost:5173',
        ],
    },
});
