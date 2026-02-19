export const validate = (config: Record<string, any>) => {
    if (!config.MONGO_URI && !process.env.MONGO_URI) {
        // throw new Error('MONGO_URI is missing');
    }
    return config;
};
