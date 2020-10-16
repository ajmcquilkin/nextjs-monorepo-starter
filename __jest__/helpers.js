const mongoose = require('mongoose');

const mockSession = {
  cas_user: 'nathan.m.schneider.22@dartmouth.edu',
  info: {
    name: 'Nathan Schneider',
    netid: 'F003F66'
  }
};

async function connectDB(done) {
  const mongooseOpts = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  };

  mongoose.connect(process.env.MONGO_URL, mongooseOpts);

  mongoose.connection.on('error', (e) => {
    console.error(e);
    if (e.message.code === 'ETIMEDOUT') {
      mongoose.connect(process.env.MONGO_URL, mongooseOpts);
    } else {
      done(e);
    }
  });

  mongoose.connection.once('open', () => {
    // console.log(`MongoDB successfully connected to ${process.env.MONGO_URL}`);
    done();
  });
}

async function dropDB(done) {
  try {
    await mongoose.connection.db.dropDatabase();
    await mongoose.connection.close();
    done();
  } catch (error) {
    done(error);
  }
}

module.exports = {
  mockSession, connectDB, dropDB,
};
