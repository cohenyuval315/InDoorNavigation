import mongoose from 'mongoose';

const uri = 'mongodb://localhost:27017/mydatabase';

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(error => console.error('Error connecting to MongoDB:', error));