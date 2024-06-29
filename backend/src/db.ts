import mongoose from 'mongoose';
import logger from './lib/logger/index.js';
import seedDatabase from './seeding/index.js';

const connectDB =  async () => {
  if (process.env.MONGODB_URI) {
    mongoose.connect(process.env.MONGODB_URI);

    mongoose.connection.on('connected', async () => {
        logger.info('MongoDB connected successfully');
        await seedDatabase();
    });

    mongoose.connection.on('disconnected', () => {
        logger.info('MongoDB disconnected');
    });

    process.on('SIGINT', async () => {
      try {
        await mongoose.connection.close();
        logger.info('MongoDB connection closed due to application termination');
        process.exit(0);
      } catch (error) {
        logger.error('Error closing MongoDB connection:', error);
        process.exit(1);
      }
    });

    mongoose.connection.on('error', (err) => {
      logger.error(err);
      logger.log('%s MongoDB connection error. Please make sure MongoDB is running.', err);
      process.exit();
    });
  } else {
    logger.error("Failed to connect to MongoDB , ENV is not provided");
  }
};

export default connectDB;
